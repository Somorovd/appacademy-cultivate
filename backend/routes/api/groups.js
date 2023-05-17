const express = require("express");
const router = express.Router();

const { Group, Membership, User, Venue, GroupImage } = require("../../db/models");
const { Op } = require("sequelize");
const { requireAuth, buildAuthorzationErrorResponce } = require("../../utils/auth");
const { handleGetEventsRequest } = require("../api/events");
const { buildMissingResourceError } = require("../../utils/helpers");
const { check } = require("express-validator");
const { handleInputValidationErrors } = require("../../utils/validation");

//#region 							Express Middleware
const validateMembershipRequestInput = [
	check("memberId").exists({ checkFalsy: true })
		.withMessage("Member Id is required"),
	check("status").exists({ checkFalsy: true }).isIn(["member", "co-host"])
		.withMessage("Status must be 'member' or 'co-host'"),
	handleInputValidationErrors
]
//#endregion

//#region               GET requests
router.get("/",
	async (req, res, next) => {
		const options = {};
		return await handleGetGroupsRequest(res, options);
	}
);

router.get("/current",
	requireAuth,
	async (req, res) => {
		const options = { userIds: req.user.id }
		return await handleGetGroupsRequest(res, options);
	}
);

router.get("/:groupId",
	async (req, res, next) => {
		const options = { "groupIds": req.params.groupId, details: true }
		const { groups, memberCounts } = await getGroupsInfo(options);
		addCountsToGroups(groups, memberCounts);
		return (groups[0]) ? res.json(groups[0]) : buildMissingResourceError(next, "Group");
	}
);

router.get("/:groupId/venues",
	requireAuth,
	async (req, res, next) => {
		const userId = req.user.id;
		const groupId = req.params.groupId;

		const group = (await Group.findAll({
			attributes: ["organizerId", "id"],
			include: [{
				model: User, as: "Member", attributes: ["id"],
				through: {
					as: "Membership", attributes: ["status"],
					where: { "status": "co-host" }
				},
				required: false,
				where: { "id": userId }
			},
			{ model: Venue }
			],
			where: { "id": groupId }
		}))[0];

		if (!group)
			return buildMissingResourceError(next, "Group");

		const isNotAuthorized = (
			group.organizerId != userId && !group["Member"][0]
		);
		if (isNotAuthorized)
			return buildAuthorzationErrorResponce(next);

		return (group) ?
			res.json({ "Venues": group["Venues"] }) :
			buildMissingResourceError(next, "Group");
	}
);

router.get("/:groupId/events",
	async (req, res, next) => {
		const options = { groupIds: req.params.groupId };
		const events = await handleGetEventsRequest(options);
		return (events.length) ?
			res.json(events) :
			buildMissingResourceError(next, "Group");
	}
);

router.get("/:groupId/members",
	async (req, res, next) => {
		const groupId = req.params.groupId;
		const group = await Group.findAll({
			where: { "id": groupId, "organizerId": req.user.id }
		});

		const where = (group[0]) ? {} : { "status": { [Op.ne]: "pending" } };
		const users = await User.findAll({
			attributes: ["id", "firstName", "lastName"],
			include: {
				model: Group, attributes: ["id"],
				where: { "id": groupId },
				through: { attributes: ["status"], where: where }
			}
		});

		const userArr = [];
		for (let user of users) {
			user = user.toJSON();
			user["Membership"] = user["Groups"][0]["Membership"];
			delete user["Groups"];
			userArr.push(user);
		}

		return (userArr[0]) ?
			res.json(userArr) :
			buildMissingResourceError(next, "Group")
	}
);

//#region               GET responses

async function handleGetGroupsRequest(res, options) {
	const { groups, memberCounts } = await getGroupsInfo(options);
	addCountsToGroups(groups, memberCounts);
	if (!options.details) assignGroupPreviewImages(groups);
	return res.json({ "Groups": groups });
}
//#endregion
//#endregion

//#region               POST requests
router.post("/",
	requireAuth,
	async (req, res, next) => {
		const { name, about, type, private, city, state } = req.body;
		const group = await Group.create({
			organizerId: req.user.id,
			name, about, type, private, city, state
		});
		return res.json(group);
	}
);

router.post("/:groupId/venues",
	requireAuth,
	async (req, res, next) => {
		const userId = req.user.id;
		const groupId = req.params.groupId;
		const { address, city, state, lat, lng } = req.body;

		const group = (await Group.findAll({
			attributes: ["organizerId", "id"],
			include: {
				model: User, as: "Member", attributes: ["id"],
				through: {
					as: "Membership", attributes: ["status"],
					where: { "status": "co-host" }
				},
				required: false,
				where: { "id": userId }
			},
			where: { "id": groupId }
		}))[0];

		if (!group)
			return buildMissingResourceError(next, "Group");

		const isNotAuthorized = (
			group.organizerId != userId && !group["Member"][0]
		);
		if (isNotAuthorized)
			return buildAuthorzationErrorResponce(next);

		const venue = await group.createVenue(
			{ groupId, address, city, state, lat, lng }
		);
		return res.json(venue);
	}
);

router.post("/:groupId/events",
	requireAuth,
	async (req, res, next) => {
		const userId = req.user.id;
		const groupId = req.params.groupId;
		const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;

		const group = (await Group.findAll({
			attributes: ["organizerId", "id"],
			include: {
				model: User, as: "Member", attributes: ["id"],
				through: {
					as: "Membership", attributes: ["status"],
					where: { "status": "co-host" }
				},
				required: false,
				where: { "id": userId }
			},
			where: { "id": groupId }
		}))[0];

		if (!group)
			return buildMissingResourceError(next, "Group");

		if (venueId) {
			const venue = await Venue.findByPk(venueId);
			if (!venue)
				return buildMissingResourceError(next, "Venue");
		}

		const isNotAuthorized = (
			group.organizerId != userId && !group["Member"][0]
		);
		if (isNotAuthorized)
			return buildAuthorzationErrorResponce(next);

		const event = await group.createEvent(
			{ groupId, venueId, name, type, capacity, price, description, startDate, endDate }
		);
		return res.json(event);
	}
);

router.post("/:groupId/images",
	requireAuth,
	async (req, res, next) => {
		const groupId = req.params.groupId;
		const userId = req.user.id;
		const { url, preview } = req.body;

		const group = (await Group.findAll({
			attributes: ["organizerId"],
			where: { "id": groupId }
		}))[0];

		if (!group)
			return buildMissingResourceError(next, "Group");

		const isNotAuthorized = group.organizerId != userId;
		if (isNotAuthorized)
			return buildAuthorzationErrorResponce(next);

		const image = await GroupImage.create(
			{ groupId, url, preview }
		);

		group.addGroupImage(image);

		return res.json({
			id: image.id,
			url: image.url,
			preview: image.preview
		});
	}
);

router.post("/:groupId/membership",
	requireAuth,
	async (req, res, next) => {
		const groupId = req.params.groupId;
		const userId = req.user.id;
		const group = await Group.findByPk(groupId, {
			include: {
				model: User, as: "Member",
				attributes: ["id"],
				through: { attributes: ["status"] },
				required: false,
				where: { "id": userId }
			}
		});

		if (!group)
			return buildMissingResourceError(next, "Group");

		if (group["Member"][0]) {
			const status = group["Member"][0]["Membership"].status;
			if (status === "pending") {
				const err = new Error("Membership has already been requested");
				err.title = "Bad Request";
				err.status = 400;
				return next(err);
			}
			else {
				const err = new Error("User is already a member of the group");
				err.title = "Bad Request";
				err.status = 400;
				return next(err);
			}
		}

		const membership = await Membership.create(
			{ userId, groupId, status: "pending" }
		);

		return res.json(membership);
	}
);
//#endregion

//#region 							PUT requests
router.put("/:groupId",
	requireAuth,
	async (req, res, next) => {
		const { name, about, type, private, city, state } = req.body;
		const groupId = req.params.groupId;
		const userId = req.user.id;

		const group = await Group.findByPk(groupId);

		if (!group)
			return buildMissingResourceError(next, "Group");

		const isNotAuthorized = group.organizerId != userId;
		if (isNotAuthorized)
			return buildAuthorzationErrorResponce(next);

		group.set({ name, about, type, private, city, state });
		await group.save();

		return res.json(group);
	}
);

router.put("/:groupId/membership",
	requireAuth, validateMembershipRequestInput,
	async (req, res, next) => {
		const { memberId, status } = req.body;
		const groupId = req.params.groupId;
		const userId = req.user.id;

		const group = await Group.findByPk(groupId, {
			attributes: ["organizerId"],
			include: {
				model: User, as: "Member",
				attributes: ["id"],
				required: false,
				where: { "id": [memberId, userId] }
			}
		});


		if (!group)
			return buildMissingResourceError(next, "Group");

		let host, member;
		for (let user of group["Member"]) {
			if (user.id == userId) host = user;
			if (user.id == memberId) member = user;
		}

		const isAuthorized = (
			group.organizerId == host.id ||
			(
				host["Membership"].status == "co-host" &&
				status == "member"
			)
		);

		if (!isAuthorized)
			return buildAuthorzationErrorResponce(next);

		if (!member) {
			member = await User.findByPk(memberId);
			if (!member) {
				const err = new Error("User could not be found");
				err.title = "Validation Error";
				err.status = 400;
				return next(err);
			} else
				return buildMissingResourceError(next, "Membership");
		}

		const membership = member["Membership"];
		membership.set({ status });
		await membership.save();

		return res.json(membership);
	}
);
//#endregion

//#region               DELETE Requests
router.delete("/:groupId",
	requireAuth,
	async (req, res, next) => {
		const group = await Group.findByPk(req.params.groupId);
		if (!group)
			return buildMissingResourceError(next, "Group");
		if (group.organizerId !== req.user.id)
			return buildAuthorzationErrorResponce(next);

		await group.destroy();
		return res.json({ message: "Successfully deleted" })
	}
);

router.delete("/:groupId/membership",
	requireAuth,
	async (req, res, next) => {
		const userId = req.user.id;
		const memberId = req.body.memberId;
		const groupId = req.params.groupId;

		console.log({ userId, memberId });

		const group = (await Group.findAll({
			attributes: ["organizerId"],
			include: {
				model: User, as: "Member",
				attributes: ["id"],
				where: { "id": [memberId, userId] },
				required: false
			},
			where: { "id": groupId },
			required: true
		}))[0];

		if (!group) return buildMissingResourceError(next, "Group");

		let member;
		for (let user of group["Member"]) {
			if (user.id != memberId) continue;
			member = user;
			break;
		}

		if (!member) {
			member = await User.findByPk(memberId);
			if (!member)
				return buildMissingResourceError(next, "User");
			else
				return res.json({ message: "membership does not exists between user and group" });
		}

		const isNotAuthorized = (
			userId != group.organizerId && userId != memberId
		);
		if (isNotAuthorized)
			return buildAuthorzationErrorResponce(next);

		await member["Membership"].destroy();
		return res.json({ message: "Successfully deleted" });
	}
);
//#endregion

function addCountsToGroups(groups, memberCounts) {
	for (let i in groups) groups[i].numMembers = memberCounts[i];
}

function assignGroupPreviewImages(groups) {
	for (let group of groups) {
		group.previewImage = group.GroupImages[0]?.url || null;
		delete group.GroupImages;
	}
}

async function countGroupMembers(group) {
	return await Membership.count({
		where: { "groupId": group.id, [Op.not]: { "status": "pending" } }
	});
}

async function getGroupsInfo(options) {
	const { userIds, hostIds, groupIds, details } = options;
	const scopes = [details ? "details" : "getPreviewImage"];
	if (userIds) scopes.push({ method: ["filterByMembers", userIds] });
	if (hostIds) scopes.push({ method: ["filterByHosts", hostIds] });
	if (groupIds) scopes.push({ method: ["filterByGroups", groupIds] });

	const groups = await Group.scope(scopes).findAll();
	const memberCounts = await Promise.all(
		groups.map(async (group) => await countGroupMembers(group))
	);
	return { "groups": groups.map((group) => group.toJSON()), memberCounts };
}

module.exports = router;

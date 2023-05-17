const express = require("express");
const router = express.Router();

const { Event, EventImage, Attendance, Group, User } = require("../../db/models");
const { buildMissingResourceError } = require("../../utils/helpers");
const { requireAuth, buildAuthorzationErrorResponce } = require("../../utils/auth");
const { Op } = require("sequelize");

//#region               GET requests
router.get("/",
	async (req, res) => {
		const options = {};
		const events = await handleGetEventsRequest(options);
		return res.json(events);
	}
);

router.get("/:eventId",
	async (req, res, next) => {
		const options = { eventIds: req.params.eventId, details: true };
		const events = await handleGetEventsRequest(options);
		return (events[0]) ?
			res.json(events[0]) :
			buildMissingResourceError(next, "Event");
	}
);

router.get("/:eventId/attendees",
	async (req, res, next) => {
		const options = { eventIds: req.params.eventId };
		const userId = req.user.id;
		const event = await Event.findByPk(req.params.eventId, {
			include: {
				model: Group, attributes: ["organizerId"],
				include: {
					model: User, as: "Member",
					where: { "id": userId },
					through: { as: "Membership" }
				},
				required: false,
				where: {
					[Op.or]: {
						"organizerId": userId,
						"$Group.Member.Membership.status$": "co-host"
					}
				}
			}
		});

		options.attendees = event != null && event["Group"] !== null;
		const events = await handleGetEventsRequest(options);

		return (events[0]) ?
			res.json({ "Attendees": events[0]["Users"] }) :
			buildMissingResourceError(next, "Event")
	}
);

//#region               GET responces
async function handleGetEventsRequest(options) {
	const { events, attendingCounts } = await getEventsInfo(options);
	addCountsToEvents(events, attendingCounts);
	if (!options.details) assignEventPreviewImages(events);
	return events;
}
//#endregion
//#endregion

//#region 							POST requests
router.post("/:eventId/images",
	requireAuth,
	async (req, res, next) => {
		const eventId = req.params.eventId;
		const userId = req.user.id;
		const { url, preview } = req.body;

		const event = (await Event.findAll({
			attributes: ["id"],
			include: { model: Group, attributes: ["organizerId"] },
			where: { "id": eventId }
		}))[0];

		if (!event)
			return buildMissingResourceError(next, "Event");

		const isNotAuthorized = event["Group"].organizerId != userId;
		if (isNotAuthorized)
			return buildAuthorzationErrorResponce(next);

		const image = await EventImage.create(
			{ eventId, url, preview }
		);
		event.addEventImage(image);

		return res.json({
			id: image.id,
			url: image.url,
			preview: image.preview
		});
	}
);
//#endregion

//#region               DELETE requests
router.delete("/:eventId",
	requireAuth,
	async (req, res, next) => {
		const userId = req.user.id;
		const event = await Event.findByPk(req.params.eventId, {
			include: {
				model: Group, attributes: ["organizerId"],
				include: {
					model: User, as: "Member",
					through: {
						attributes: ["status"],
						where: { "status": "co-host", "userId": userId }
					}
				}
			}
		});
		if (!event)
			return buildMissingResourceError(next, "Event");

		const isNotAuthorized = (
			event["Group"].organizerId != userId &&
			!event["Group"]["Member"][0]
		);

		if (isNotAuthorized)
			return buildAuthorzationErrorResponce(next);

		await event.destroy();
		return res.json({ message: "Successfully deleted" });
	}
);

router.delete("/:eventId/attendance",
	requireAuth,
	async (req, res, next) => {
		const userId = req.user.id;
		const memberId = req.body.memberId;
		const eventId = req.params.eventId;

		const user = (await User.findAll({
			where: { "id": memberId },
			attributes: ["id"],
			include: [
				{
					model: Event, attributes: ["id"], where: { "id": eventId },
					required: false,
					include: {
						model: Group, attributes: ["organizerId"],
						required: false,
						include: {
							model: User, as: "Member", attributes: ["id"],
							required: false,
							where: { "id": userId },
							through: { attributes: ["status"] }
						}
					}
				},
			]
		}))[0];

		if (!user)
			return buildMissingResourceError(next, "User");

		let event = user["Events"][0];
		if (!event) {
			event = await Event.findByPk(eventId);
			if (!event)
				return buildMissingResourceError(next, "Event");
			else
				return res.json({ message: "attendance does not exist between user and event" });
		}

		const { organizerId, Member } = event["Group"];
		const isNotAuthorized = (
			userId != memberId &&
			userId != organizerId &&
			!Member[0]
		);
		if (isNotAuthorized)
			return buildAuthorzationErrorResponce(next);

		await event["Attendance"].destroy();
		return res.json({ message: "Successfully deleted" });
	}
);
//#endregion

function addCountsToEvents(events, counts) {
	for (let i in events) events[i].numAttending = counts[i];
}

function assignEventPreviewImages(events) {
	for (let event of events) {
		event.previewImage = event["EventImages"][0]?.url || null;
		delete event["EventImages"];
	}
}

async function countAttending(event) {
	return await Attendance.count({
		where: { "eventId": event.id, "status": "attending" }
	})
}

async function getEventsInfo(options) {
	const { details, groupIds, eventIds, attendees } = options;
	const scopes = ["general"];
	if (details) scopes.push("details")
	else scopes.push("getPreviewImage");
	if (groupIds) scopes.push({ method: ["filterByGroups", groupIds] });
	if (eventIds) scopes.push({ method: ["filterByEvents", eventIds] });
	if (attendees !== undefined) scopes.push({ method: ["getAttendees", attendees] });

	const events = (await Event.scope(scopes).findAll()).map((event) => event.toJSON());
	const attendingCounts = await Promise.all(
		events.map(async (event) => await countAttending(event))
	);
	return { events, attendingCounts };
}

module.exports = {
	router, handleGetEventsRequest
};

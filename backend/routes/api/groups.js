const express = require("express");
const router = express.Router();

const { Group, Membership, User } = require("../../db/models");
const { Op } = require("sequelize");
const { requireAuth, buildAuthorzationErrorResponce } = require("../../utils/auth");
const { buildMissingResourceError } = require("../../utils/helpers");
const { handleGetEventsRequest } = require("../api/events");

//#region               GET requests
router.get("/", async (req, res, next) => {
  const options = {};
  return await handleGetGroupsRequest(res, options);
});

router.get("/current", requireAuth, async (req, res) => {
  const options = { userIds: req.user.id }
  return await handleGetGroupsRequest(res, options);
});

router.get("/:groupId", async (req, res, next) => {
  const options = { "groupIds": req.params.groupId, details: true }
  const { groups, memberCounts } = await getGroupsInfo(options);
  addCountsToGroups(groups, memberCounts);
  return (groups[0]) ? res.json(groups[0]) : buildMissingResourceError(next, "Group");
});

router.get("/:groupId/venues", requireAuth, async (req, res, next) => {
  const options = { hostIds: req.user.id, groupIds: req.params.groupId, details: true };
  const group = (await getGroupsInfo(options)).groups[0];
  return (group) ?
    res.json({ "Venues": group["Venues"] }) :
    buildMissingResourceError(next, "Group");
});

router.get("/:groupId/events", async (req, res, next) => {
  const options = { groupIds: req.params.groupId };
  const events = await handleGetEventsRequest(options);
  return (events.length) ?
    res.json(events) :
    buildMissingResourceError(next, "Group");
});

router.get("/:groupId/members", async (req, res, next) => {
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
});

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
router.post("/", requireAuth, async (req, res, next) => {
  const { name, about, type, private, city, state } = req.body;
  const group = await Group.create({
    organizerId: req.user.id,
    name, about, type, private, city, state
  });
  return res.json(group);
});
//#endregion

//#region               DELETE Requests
router.delete("/:groupId", requireAuth, async (req, res, next) => {
  const group = await Group.findByPk(req.params.groupId);
  if (!group)
    return buildMissingResourceError(next, "Group");
  if (group.organizerId !== req.user.id)
    return buildAuthorzationErrorResponce(next);

  await group.destroy();
  return res.json({ message: "Successfully deleted" })
});

router.delete(
  "/:groupId/membership",
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

    if (!group)
      return buildMissingResourceError(next, "Group");


    const isNotAuthorized = (
      userId != group.organizerId && userId != memberId
    );

    if (isNotAuthorized)
      return buildAuthorzationErrorResponce(next);

    let membershipToDelete;
    for (let user of group["Member"]) {
      if (user.id != memberId) continue;
      membershipToDelete = user["Membership"];
      break;
    }

    if (!membershipToDelete)
      return buildMissingResourceError(next, "Membership");

    // return res.json(membershipToDelete);
    console.log("\n\n\n\n\n")
    await membershipToDelete.destroy();
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
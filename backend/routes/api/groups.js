const express = require("express");
const router = express.Router();

const { Group, Membership, Event } = require("../../db/models");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
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

router.get("/:groupId/events", async (req, res) => {
  const options = { groupIds: req.params.groupId, details: true };
  return handleGetEventsRequest(res, options);
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
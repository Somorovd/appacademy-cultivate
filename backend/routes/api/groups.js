const express = require("express");
const router = express.Router();

const { Group, Membership, GroupImage, User, Venue } = require("../../db/models");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { buildMissingResourceError } = require("../../utils/helpers");

//#region               GET requests
router.get("/", async (req, res, next) => {
  const options = {};
  return await handleGetGroupsRequest(res, options);
});

router.get("/current", requireAuth, async (req, res) => {
  const options = { userIds: [req.user.id] }
  return await handleGetGroupsRequest(res, options);
});

router.get("/:groupId", async (req, res, next) => {
  const options = { "groupIds": [req.params.groupId], details: true }
  const { groups, memberCounts } = await getGroupsInfo(options);
  addCountsToGroups(groups, memberCounts);
  return (groups[0]) ? res.json(groups[0]) : buildMissingResourceError(next, "Group");
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
  for (let i in groups) {
    const group = groups[i];
    group.numMembers = memberCounts[i];
  }
  return groups;
}

function assignGroupPreviewImages(groups) {
  for (let i in groups) {
    const group = groups[i];
    group.previewImage = group.GroupImages[0]?.url || null;
    delete group.GroupImages;
  }
  return groups;
}

async function countGroupMembers(group) {
  return await Membership.count({
    where: { "groupId": group.id, [Op.not]: { "status": "pending" } }
  });
}

async function getGroupsInfo(options) {
  const { userIds, groupIds, details } = options;
  const scopes = [details ? "details" : "getPreviewImage"];
  if (userIds?.length) scopes.push({ method: ["filterByMembers", userIds] });
  if (groupIds?.length) scopes.push({ method: ["filterByGroups", groupIds] });

  const groups = await Group.scope(scopes).findAll();
  const memberCounts = await Promise.all(
    groups.map(async (group) => await countGroupMembers(group))
  );
  return { "groups": groups.map((group) => group.toJSON()), memberCounts };
}

module.exports = router;
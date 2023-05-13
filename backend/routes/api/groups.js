const express = require("express");
const router = express.Router();

const { Group, Membership, GroupImage, User } = require("../../db/models");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");

//#region               GET requests
router.get("/", async (req, res, next) => {
  return await handleGetGroupsRequest(res);
});

router.get("/current", requireAuth, async (req, res) => {
  return await handleGetGroupsRequest(res, [req.user.id])
});

//#region               GET responses
function buildGroupInfoResponse(res, groups, memberCounts) {
  for (let i in groups) {
    const group = groups[i];
    group.numMembers = memberCounts[i];
    group.previewImage = group.GroupImages[0]?.url || null;
    delete group.GroupImages;
  }
  return res.json({ "Groups": groups });
}

async function handleGetGroupsRequest(res, ids) {
  const groups = await getGroupsInfoAndImage(ids);
  const memberCounts = await Promise.all(
    groups.map(async (group) => await countGroupMembers(group))
  );
  return buildGroupInfoResponse(res, groups, memberCounts);
}
//#endregion
//#endregion

async function countGroupMembers(group) {
  return await Membership.count({
    where: { "groupId": group.id, [Op.not]: { "status": "pending" } }
  });
}

async function getGroupsInfoAndImage(ids) {
  const scopes = ["getPreviewImage"];
  if (ids) scopes.push({ method: ["filterByMembers", [ids]] })
  const groups = await Group.scope(scopes).findAll();
  return groups.map((group) => group.toJSON());
}

module.exports = router;
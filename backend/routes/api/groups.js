const express = require("express");
const router = express.Router();

const { Group, Membership, GroupImage, User } = require("../../db/models");
const { Op } = require("sequelize");
const { requireAuth } = require("../../utils/auth");

//#region               GET requests
router.get("/", async (req, res, next) => {
  const groups = await getGroupsInfoAndImage();
  const memberCounts = await Promise.all(
    groups.map(async (group) => await countGroupMembers(group))
  );
  return buildGroupInfoResponce(res, groups, memberCounts);
});

router.get("/current", requireAuth, async (req, res) => {
  const user = req.user;
  const groups = await getGroupsInfoAndImage([user.id]);
  const memberCounts = await Promise.all(
    groups.map(async (group) => await countGroupMembers(group))
  );
  return buildGroupInfoResponce(res, groups, memberCounts);
});

//#region               GET responses
function buildGroupInfoResponce(res, groups, memberCounts) {
  for (let i in groups) {
    const group = groups[i];
    group.numMembers = memberCounts[i];
    group.previewImage = group.GroupImages[0]?.url || null;
    delete group.GroupImages;
  }
  return res.json({ "Groups": groups });
}
//#endregion
//#endregion

async function countGroupMembers(group) {
  return await Membership.count({
    where: { "groupId": group.id, [Op.not]: { "status": "pending" } }
  });
}

async function getGroupsInfoAndImage(ids = null) {
  const scopes = ["getPreviewImage"];
  if (ids) scopes.push({ method: ["filterByMembers", [ids]] })
  const groups = await Group.scope(scopes).findAll();
  return groups.map((group) => group.toJSON());
}



module.exports = router;
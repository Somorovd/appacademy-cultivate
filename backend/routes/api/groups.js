const express = require("express");
const router = express.Router();

const { Group, Membership, GroupImage } = require("../../db/models");
const { Op } = require("sequelize");

//#region               GET requests
router.get("/", async (req, res, next) => {
  const groups = await getAllGroupsInfoAndImage();
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

async function getAllGroupsInfoAndImage() {
  const groups = await Group.findAll({
    include: {
      model: GroupImage,
      attributes: ["url"],
      where: { "preview": true },
      limit: 1
    }
  });
  return groups.map((group) => group.toJSON());
}



module.exports = router;
const express = require("express");
const router = express.Router();

const { Group, Membership, GroupImage } = require("../../db/models");
const { Op } = require("sequelize");

//#region               GET requests
router.get("/", async (req, res, next) => {
  const responce = { "Groups": [] };
  const groups = await Group.findAll({
    include: {
      model: GroupImage,
      attributes: ["url"],
      where: { "preview": true },
      limit: 1
    }
  });

  for (let group of groups) {
    const { GroupImages, ...g } = group.toJSON();
    g.numMembers = await Membership.count({
      where: {
        "groupId": group.id,
        [Op.not]: { "status": "pending" }
      }
    });
    g.previewImage = GroupImages[0]?.url || null;
    responce["Groups"].push(g);
  }
  return res.json(responce);
});
//#endregion

module.exports = router;
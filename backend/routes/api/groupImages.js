const express = require("express");
const { requireAuth, buildAuthorzationErrorResponce } = require("../../utils/auth");
const { GroupImage, Group, User } = require("../../db/models");
const { buildMissingResourceError } = require("../../utils/helpers");
const router = express.Router();

//#region               DELETE requests
router.delete("/:imageId",
  requireAuth,
  async (req, res, next) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;
    const group = (await Group.findAll({
      attributes: ["organizerId"],
      include: [
        {
          model: GroupImage, where: { "id": imageId },
          attributes: ["id", "groupId"]
        },
        {
          model: User, as: "Members",
          through: { where: { "userId": userId, "status": "co-host" } }
        }
      ]
    }))[0];

    if (!group)
      return buildMissingResourceError(next, "Image");

    const isNotAuthorized = (
      group.organizerId != userId && !group["Members"][0]
    );
    if (isNotAuthorized) return buildAuthorzationErrorResponce(next);

    const image = group["GroupImages"][0];
    await image.destroy();
    return res.json({ message: "Successfully deleted" });
  }
);

module.exports = router;
const express = require("express");
const {
  requireAuth,
  buildAuthorzationErrorResponce,
} = require("../../utils/auth");
const { GroupImage, Group, User } = require("../../db/models");
const { buildMissingResourceError } = require("../../utils/helpers");
const router = express.Router();

//#region               DELETE requests
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const imageId = req.params.imageId;
  const userId = req.user.id;

  const groupImage = await GroupImage.findByPk(imageId, {
    include: {
      model: Group.scope({ method: ["includeAuthorization", userId] }),
    },
  });

  if (!groupImage) return buildMissingResourceError(next, "Image");

  const group = groupImage["Group"];
  const isNotAuthorized = group.organizerId != userId && !group["Members"][0];
  if (isNotAuthorized) return buildAuthorzationErrorResponce(next);

  await groupImage.destroy();
  return res.json({ message: "Successfully deleted" });
});

module.exports = router;

const express = require("express");
const {
  requireAuth,
  buildAuthorzationErrorResponce,
} = require("../../utils/auth");
const { Op } = require("sequelize");
const { GroupImage, Group, User } = require("../../db/models");
const { buildMissingResourceError } = require("../../utils/helpers");
const router = express.Router();

//#region               PUT requests
router.put("/:imageId", requireAuth, async (req, res, next) => {
  console.log("here is put route");
  const imageId = req.params.imageId;
  const userId = req.user.id;

  const groupImages = await GroupImage.findAll({
    include: {
      model: Group.scope({ method: ["includeAuthorization", userId] }),
    },
    where: {
      [Op.or]: {
        preview: true,
        id: imageId,
      },
    },
  });

  const groupImage = groupImages.find((img) => img.id === Number(imageId));
  if (!groupImage) return buildMissingResourceError(next, "Image");

  const group = groupImage["Group"];
  const isNotAuthorized = group.organizerId != userId && !group["Members"][0];
  if (isNotAuthorized) return buildAuthorzationErrorResponce(next);

  for (let groupImage of groupImages) {
    groupImage.set({ preview: !groupImage.preview });
    await groupImage.save();
  }

  return res.json({ groupImage });
});

//#endregion

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
  if (groupImage.preview) {
    const err = new Error("Cannot delete preview image");
    err.title = "Forbidden";
    err.status = 403;
    return next(err);
  }

  const group = groupImage["Group"];
  const isNotAuthorized = group.organizerId != userId && !group["Members"][0];
  if (isNotAuthorized) return buildAuthorzationErrorResponce(next);

  await groupImage.destroy();
  return res.json({ message: "Successfully deleted" });
});

//#endregion

module.exports = router;

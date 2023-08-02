const express = require("express");
const {
  requireAuth,
  buildAuthorzationErrorResponce,
} = require("../../utils/auth");
const { GroupImage, Group } = require("../../db/models");
const { buildMissingResourceError } = require("../../utils/helpers");
const router = express.Router();

//#region               PUT requests
router.put("/:imageId", requireAuth, async (req, res, next) => {
  const imageId = req.params.imageId;
  const userId = req.user.id;

  const currentImage = await GroupImage.findByPk(imageId, {
    include: {
      model: Group.scope({ method: ["includeAuthorization", userId] }),
    },
  });

  if (!currentImage) return buildMissingResourceError(next, "Image");

  const group = currentImage["Group"];
  const isNotAuthorized = group.organizerId != userId && !group["Members"][0];
  if (isNotAuthorized) return buildAuthorzationErrorResponce(next);

  const previewImage = await GroupImage.findOne({
    where: {
      groupId: group.id,
      preview: true,
    },
  });

  currentImage.set({ preview: true });
  await currentImage.save();

  if (previewImage) {
    previewImage.set({ preview: false });
    await previewImage.save();
  }

  return res.json({ currentImage });
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

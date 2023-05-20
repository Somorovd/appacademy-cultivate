const express = require("express");
const { requireAuth, buildAuthorzationErrorResponce } = require("../../utils/auth");
const { EventImage, Event, Group, User } = require("../../db/models");
const { buildMissingResourceError } = require("../../utils/helpers");
const router = express.Router();

//#region               DELETE requests
router.delete("/:imageId",
  requireAuth,
  async (req, res, next) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;

    const eventImage = await EventImage.findByPk(imageId, {
      include: {
        model: Event.scope("minimal"),
        include: {
          model: Group.scope({ method: ["includeAuthorization", userId] })
        }
      }
    });

    if (!eventImage)
      return buildMissingResourceError(next, "Image");

    const group = eventImage["Event"]["Group"];
    const isNotAuthorized = (
      group.organizerId != userId && !group["Members"][0]
    );
    if (isNotAuthorized) return buildAuthorzationErrorResponce(next);

    await eventImage.destroy();
    return res.json({ message: "Successfully deleted" });
  }
);
//#endregion

module.exports = router;
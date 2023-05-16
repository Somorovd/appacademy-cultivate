const express = require("express");
const { requireAuth, buildAuthorzationErrorResponce } = require("../../utils/auth");
const { EventImage, Event, Group, User } = require("../../db/models");
const { buildMissingResourceError } = require("../../utils/helpers");
const router = express.Router();

router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const imageId = req.params.imageId;
  const userId = req.user.id;

  const group = (await Group.findAll({
    attributes: ["organizerId"],
    include: [
      {
        model: User, as: "Member", attributes: ["id"],
        through: {
          attributes: [],
          where: { "userId": userId, "status": "co-host" },
        }
      },
      {
        model: Event, attributes: ["id"],
        include: {
          model: EventImage, attributes: ["id"],
          where: { "id": imageId },
        },
        required: true
      }
    ]
  }))[0];

  // return res.json(group);

  if (!group)
    return buildMissingResourceError(next, "Image");


  const isNotAuthorized = (
    group.organizerId != userId && !group["Member"][0]
  );
  if (isNotAuthorized) return buildAuthorzationErrorResponce(next);

  const image = group["Events"][0]["EventImages"][0];
  await image.destroy();
  return res.json({ message: "Successfully deleted" });
});

module.exports = router;
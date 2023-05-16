const express = require("express");
const router = express.Router();

const { Event, EventImage, Attendance, Group, User } = require("../../db/models");
const { buildMissingResourceError } = require("../../utils/helpers");
const { requireAuth, buildAuthorzationErrorResponce } = require("../../utils/auth");
const { Op } = require("sequelize");

//#region               GET requests
router.get("/",
  async (req, res) => {
    const options = {};
    const events = await handleGetEventsRequest(options);
    return res.json(events);
  }
);

router.get("/:eventId",
  async (req, res, next) => {
    const options = { eventIds: req.params.eventId, details: true };
    const events = await handleGetEventsRequest(options);
    return (events[0]) ?
      res.json(events[0]) :
      buildMissingResourceError(next, "Event");
  }
);

router.get("/:eventId/attendees",
  async (req, res, next) => {
    const options = { eventIds: req.params.eventId };
    const userId = req.user.id;
    const event = await Event.findByPk(req.params.eventId, {
      include: {
        model: Group, attributes: ["organizerId"],
        include: {
          model: User, as: "Member",
          where: { "id": userId },
          through: { as: "Membership" }
        },
        required: false,
        where: {
          [Op.or]: {
            "organizerId": userId,
            "$Group.Member.Membership.status$": "co-host"
          }
        }
      }
    });

    options.attendees = event != null && event["Group"] !== null;
    const events = await handleGetEventsRequest(options);

    return (events[0]) ?
      res.json({ "Attendees": events[0]["Users"] }) :
      buildMissingResourceError(next, "Event")
  }
);

//#region               GET responces
async function handleGetEventsRequest(options) {
  const { events, attendingCounts } = await getEventsInfo(options);
  addCountsToEvents(events, attendingCounts);
  if (!options.details) assignEventPreviewImages(events);
  return events;
}
//#endregion
//#endregion

//#region               DELETE requests
router.delete("/:eventId",
  requireAuth,
  async (req, res, next) => {
    const userId = req.user.id;
    const event = await Event.findByPk(req.params.eventId, {
      include: {
        model: Group, attributes: ["organizerId"],
        include: {
          model: User, as: "Member",
          through: {
            attributes: ["status"],
            where: { "status": "co-host", "userId": userId }
          }
        }
      }
    });
    if (!event)
      return buildMissingResourceError(next, "Event");

    const isNotAuthorized = (
      event["Group"].organizerId != userId &&
      !event["Group"]["Member"][0]
    );

    if (isNotAuthorized)
      return buildAuthorzationErrorResponce(next);

    await event.destroy();
    return res.json({ message: "Successfully deleted" });
  }
);

router.delete("/:eventId/attendance",
  requireAuth,
  async (req, res, next) => {
    const userId = req.user.id;
    const memberId = req.body.memberId;
    const eventId = req.params.eventId;

    const group = (await Group.findAll({
      attributes: ["organizerId"],
      include: [
        {
          model: User, as: "Member",
          attributes: ["id"],
          through: {
            attributes: ["status"],
            where: { "status": "co-host" }
          },
          where: { "id": userId },
          required: false
        },
        {
          model: Event, attributes: ["id"],
          include: {
            model: User, attributes: ["id"],
            where: { "id": memberId },
            required: false
          },
          where: { "id": eventId },
        }
      ],

      required: true
    }))[0];

    if (!group)
      return buildMissingResourceError(next, "Event");

    const isNotAuthorized = (
      memberId != userId &&
      group.organizerId != userId &&
      !group["Member"][0]
    );
    if (isNotAuthorized)
      return buildAuthorzationErrorResponce(next);

    const user = group["Events"][0]["Users"][0];
    if (!user)
      return buildMissingResourceError(next, "Attendance");

    await user["Attendance"].destroy();
    return res.json({ message: "Successfully deleted" });
  }
);
//#endregion

function addCountsToEvents(events, counts) {
  for (let i in events) events[i].numAttending = counts[i];
}

function assignEventPreviewImages(events) {
  for (let event of events) {
    event.previewImage = event["EventImages"][0]?.url || null;
    delete event["EventImages"];
  }
}

async function countAttending(event) {
  return await Attendance.count({
    where: { "eventId": event.id, "status": "attending" }
  })
}

async function getEventsInfo(options) {
  const { details, groupIds, eventIds, attendees } = options;
  const scopes = ["general"];
  if (details) scopes.push("details")
  else scopes.push("getPreviewImage");
  if (groupIds) scopes.push({ method: ["filterByGroups", groupIds] });
  if (eventIds) scopes.push({ method: ["filterByEvents", eventIds] });
  if (attendees !== undefined) scopes.push({ method: ["getAttendees", attendees] });

  const events = (await Event.scope(scopes).findAll()).map((event) => event.toJSON());
  const attendingCounts = await Promise.all(
    events.map(async (event) => await countAttending(event))
  );
  return { events, attendingCounts };
}

module.exports = {
  router, handleGetEventsRequest
};


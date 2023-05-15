const express = require("express");
const router = express.Router();

const { Event, Attendance, Membership, Group, User } = require("../../db/models");
const { buildMissingResourceError } = require("../../utils/helpers");
const event = require("../../db/models/event");

const { Op } = require("sequelize");

//#region               GET requests
router.get("/", async (req, res) => {
  const options = {};
  const events = await handleGetEventsRequest(options);
  return res.json(events);
});

router.get("/:eventId", async (req, res, next) => {
  const options = { eventIds: req.params.eventId, details: true };
  const events = await handleGetEventsRequest(options);
  return (events[0]) ?
    res.json(events[0]) :
    buildMissingResourceError(next, "Event");
});

router.get("/:eventId/attendees", async (req, res, next) => {
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

  options.attendees = event["Group"] !== null;
  const events = await handleGetEventsRequest(options);

  return (events[0]) ?
    res.json({ "Attendees": events[0]["Users"] }) :
    buildMissingResourceError(next, "Event")
});

//#region               GET responces
async function handleGetEventsRequest(options) {
  const { events, attendingCounts } = await getEventsInfo(options);
  addCountsToEvents(events, attendingCounts);
  if (!options.details) assignEventPreviewImages(events);
  return events;
}
//#endregion
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


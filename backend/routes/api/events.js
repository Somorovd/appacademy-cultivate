const express = require("express");
const router = express.Router();

const { Event, Group, Venue, Attendance, EventImage } = require("../../db/models");

//#region               GET requests
router.get("/", async (req, res) => {
  const options = { details: true };
  return handleGetEventsRequest(res, options);
})

//#region               GET responces
async function handleGetEventsRequest(res, options) {
  const { events, attendingCounts } = await getEventsInfo(options);
  addCountsToEvents(events, attendingCounts);
  assignEventPreviewImages(events);
  return res.json({ "Events": events });
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
  const { details, groupIds } = options;
  const scopes = [];
  if (details) scopes.push("details");
  if (groupIds) scopes.push({ method: ["filterByGroups", groupIds] });

  const events = (await Event.scope(scopes).findAll()).map((event) => event.toJSON());
  const attendingCounts = await Promise.all(
    events.map(async (event) => await countAttending(event))
  );
  return { events, attendingCounts };
}

module.exports = {
  router, handleGetEventsRequest
};


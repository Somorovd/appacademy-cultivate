const express = require("express");
const router = express.Router();

const { Event, Attendance } = require("../../db/models");

//#region               GET requests
router.get("/", async (req, res) => {
  const options = { details: true };
  const events = await handleGetEventsRequest(options);
  return res.json(events);
})

//#region               GET responces
async function handleGetEventsRequest(options) {
  const { events, attendingCounts } = await getEventsInfo(options);
  addCountsToEvents(events, attendingCounts);
  assignEventPreviewImages(events);
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


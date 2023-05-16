const router = require('express').Router();

const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser);

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./groups.js");
const { router: eventsRouter } = require("./events.js");
const groupImagesRouter = require("./groupImages.js");
const eventImagesRouter = require("./eventImages.js");
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/groups", groupsRouter);
router.use("/events", eventsRouter);
router.use("/group-images", groupImagesRouter);
router.use("/event-images", eventImagesRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
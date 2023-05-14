const router = require('express').Router();

const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser);

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./groups.js");
const eventsRouter = require("./events.js");
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/groups", groupsRouter);
router.use("/events", eventsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
const router = require('express').Router();

const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser);

const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./groups.js");
router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/groups", groupsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
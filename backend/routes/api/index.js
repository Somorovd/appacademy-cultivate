const router = require('express').Router();

router.post('/test', function (req, res) {
  res.json({ requestBody: req.body });
});


const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth.js");

//testing setTokenCookie
const { User } = require("../../db/models");
router.get("/set-token-cookie", async (req, res) => {
  const user = await User.findOne({
    where: { username: "User1" }
  });
  setTokenCookie(res, user);
  return res.json({ user });
});

// testing restoreUser
router.use(restoreUser);
router.get("/restore-user", (req, res) => {
  return res.json(req.user);
});

// testing requireAuth
router.get("/require-auth", requireAuth, (req, res) => {
  return res.json(req.user);
});


module.exports = router;
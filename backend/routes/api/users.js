const express = require("express");
const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 12);

  const user = await User.create({ username, email, hashedPassword });
  const safeUser = { id: user.id, username, email };
  return res.json({ user: safeUser });
});

module.exports = router;
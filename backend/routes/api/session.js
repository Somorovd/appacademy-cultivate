const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// Log in

const nextLoginError = (next) => {
  const err = new Error("Login Failed");
  err.status = 401;
  err.title = "Login Failed";
  err.errors = { credential: "Invalid credentials" };
  return next(err);
}

router.post("/", async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: { username: credential, email: credential }
    }
  });

  const isMatchingPassword = bcrypt.compareSync(password, user?.hashedPassword.toString());
  if (!user || !isMatchingPassword) return nextLoginError(next);

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser
  });
});

module.exports = router;
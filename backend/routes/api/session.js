const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

const makeSafeUser = (user) => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
}

// Log in
const nextLoginError = (next) => {
  const err = new Error("Login Failed");
  err.status = 401;
  err.title = "Login Failed";
  err.errors = { credential: "Invalid credentials" };
  return next(err);
}

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password"),
  handleValidationErrors
]

router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: { username: credential, email: credential }
    }
  });

  const isMatchingPassword = bcrypt.compareSync(password, user?.hashedPassword.toString());
  if (!user || !isMatchingPassword) return nextLoginError(next);

  const safeUser = makeSafeUser(user);

  setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser
  });
});

// Log out
router.delete("/", (req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

router.get("/", (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json({ user: makeSafeUser(req.user) });
});

module.exports = router;
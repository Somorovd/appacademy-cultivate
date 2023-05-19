const { validationResult } = require("express-validator");

const handleInputValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) return next();
  buildValidationErrorResponce(next, validationErrors.array());
};

function buildValidationErrorResponce(next, errorArray, status = 400) {
  const errors = {};
  errorArray.forEach(
    (error) => errors[error.path] = error.msg || error.message
  );

  const err = new Error("Bad Request");
  err.errors = errors;
  err.status = status;
  err.title = "Bad request";
  next(err);
}

module.exports = {
  handleInputValidationErrors,
  buildValidationErrorResponce
};
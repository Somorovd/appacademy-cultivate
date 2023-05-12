const { validationResult } = require("express-validator");

const handleInputValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) return next();
  buildValidationErrorResponce(
    validationErrors.array(),
    400, "Bad Request", next
  );
};

function buildValidationErrorResponce(errorArray, status, message, next) {
  const errors = {};
  errorArray.forEach(
    (error) => errors[error.path] = error.msg || error.message
  );

  const err = new Error(message);
  err.errors = errors;
  err.status = status;
  err.title = "Bad request";
  next(err);
}

module.exports = {
  handleInputValidationErrors,
  buildValidationErrorResponce
};
function makeSafeUser(user) {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
  };
}

function buildMissingResourceError(next, resource) {
  const err = new Error(`${resource} could not be found`);
  err.title = "Resource not found"
  err.status = 404;
  return next(err);
}

module.exports = {
  makeSafeUser,
  buildMissingResourceError
};
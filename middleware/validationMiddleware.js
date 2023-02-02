const { NotFound } = require("http-errors");
const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(NotFound(error.message));
    }
    return next();
  };
};
module.exports = { validateBody };

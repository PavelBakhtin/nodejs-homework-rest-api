const Joi = require("joi");
const userValidationSchema = Joi.object({
  email: Joi.string().min(5).email().required(),
  password: Joi.string().min(4).required(),
});

module.exports = { userValidationSchema };

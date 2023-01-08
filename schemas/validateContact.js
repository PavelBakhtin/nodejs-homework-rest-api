const Joi = require("joi");
const validationSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().min(3).required(),
  phone: Joi.string().min(7).max(10).required(),
});

module.exports = { validationSchema };

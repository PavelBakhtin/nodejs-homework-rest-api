const Joi = require("joi");
const validationSchema = Joi.object({
  name: Joi.string().min(1).max(30).required(),
  email: Joi.string().min(3).required(),
  phone: Joi.string().min(5).max(15).required(),
});
const validationFavSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
module.exports = { validationSchema, validationFavSchema };

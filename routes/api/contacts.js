const express = require("express");
const Joi = require("joi");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.status(200).json(contactsList);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  return res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(30).required(),
    email: Joi.email().required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    return res.status(400).json({ status: validationRes.error.details });
  }
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  await removeContact(id);
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:id", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(30).required(),
    email: Joi.string().email().required().min(1),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });
  const validationRes = schema.validate(req.body);
  if (validationRes.error) {
    return res.status(400).json({ status: validationRes.error.details });
  }
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  const updatedContact = await updateContact(id, req.body);
  res.status(200).json(updatedContact);
});

module.exports = router;

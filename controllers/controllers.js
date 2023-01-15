const { HttpError } = require("../utilities/index");
const { Contact } = require("../models/contacts.js");
const getContacts = async (req, res, next) => {
  const { limit } = req.query;
  const contacts = await Contact.find({}).limit(limit);
  res.status(200).json(contacts);
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(contact);
};

const createContact = async (req, res, next) => {
  const { name, phone, email, favorite } = req.body;
  const newContact = await Contact.create({ name, phone, email, favorite });
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await Contact.findByIdAndRemove(id);
  res.status(200).json({ message: "contact deleted" });
};

const changeContact = async (req, res, next) => {
  const { name, phone, email } = req.body;
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      $set: { name, phone, email },
    },
    { new: true }
  );

  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { favorite } = req.body;
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!req.body) {
    return res.status(400).json({ message: "missing fields favorite" });
  }
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    {
      $set: { favorite },
    },
    { new: true }
  );

  res.status(200).json(updatedContact);
};
module.exports = {
  getContacts,
  changeContact,
  deleteContact,
  createContact,
  getContact,
  updateStatusContact,
};

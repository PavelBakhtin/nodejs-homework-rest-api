const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts.js");
const { HttpError } = require("../utilities/index");

const getContacts = async (req, res, next) => {
  const contactsList = await listContacts();
  res.status(200).json(contactsList);
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  return res.status(200).json(contact);
};

const createContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  await removeContact(id);
  res.status(200).json({ message: "contact deleted" });
};
const changeContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!req.body) {
    return res.status(400).json({ message: "missing fields" });
  }
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  const updatedContact = await updateContact(id, req.body);
  res.status(200).json(updatedContact);
};

module.exports = {
  getContacts,
  changeContact,
  deleteContact,
  createContact,
  getContact,
};

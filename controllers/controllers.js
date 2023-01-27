const { Contact } = require("../models/contact.js");

const { NotFound } = require("http-errors");

const getContacts = async (req, res, next) => {
  const { limit = 20, page = 1 } = req.body;
  const skip = (page - 1) * limit;
  const { favorite } = req.query;
  const { _id: owner } = req.user;

  if (favorite) {
    const contacts = await Contact.find({ owner, favorite: true })
      .skip(skip)
      .limit(limit);
    return res.status(200).json(contacts);
  }
  const contacts = await Contact.find({ owner }).skip(skip).limit(limit);
  return res.status(200).json(contacts);
};

const getContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOne({ _id: id, owner });
  if (!contact) {
    return next(NotFound("Not found"));
  }
  return res.status(200).json(contact);
};

const createContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { name, phone, email, favorite } = req.body;
  const newContact = new Contact({ owner, name, phone, email, favorite });
  await newContact.save();
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOne({ _id: id, owner });
  if (!contact) {
    return next(NotFound("Not found"));
  }
  await Contact.findByIdAndRemove(id);
  res.status(200).json({ message: "contact deleted" });
};

const changeContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { name, phone, email } = req.body;
  const { id } = req.params;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner },
    {
      $set: { name, phone, email },
    },
    { new: true }
  );
  if (!updatedContact) {
    return next(NotFound("Not found"));
  }
  res.status(200).json(updatedContact);
};

const updateStatusContact = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { favorite } = req.body;
  const { id } = req.params;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: id, owner },
    {
      $set: { favorite },
    },
    { new: true }
  );
  if (!updatedContact) {
    return next(NotFound("Not found"));
  }
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

const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.resolve(__dirname, "contacts.json");
const { nanoid } = require("nanoid");

const readData = async () => {
  const contactsDataRaw = await fs.readFile(contactsPath);
  const contactsData = JSON.parse(contactsDataRaw);
  return contactsData;
};

const writeData = async (db) => {
  await fs.writeFile(contactsPath, JSON.stringify(db, null, 2));
};

const listContacts = async () => {
  const contacts = await readData();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readData();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await writeData(updatedContacts);
};

const addContact = async (body) => {
  const id = nanoid();
  const { name, email, phone } = body;
  const newContact = { id, name, email, phone };
  const contacts = await readData();
  contacts.push(newContact);
  await writeData(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await readData();
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
    return contact;
  });
  await writeData(updatedContacts);
  const changedContacts = await readData();
  const [updatedContact] = changedContacts.filter(
    (contact) => contact.id === contactId
  );
  return updatedContact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

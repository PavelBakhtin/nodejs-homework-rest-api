const express = require("express");

const router = express.Router();
const {
  getContacts,
  changeContact,
  deleteContact,
  createContact,
  getContact,
} = require("../../controllers/controllers");
const { validationSchema } = require("../../schemas/validateContact");
const { validateBody } = require("../../middleware/index");
const { tryCatchWrapper } = require("../../utilities/index");
router.get("/", tryCatchWrapper(getContacts));

router.get("/:id", tryCatchWrapper(getContact));

router.post(
  "/",
  validateBody(validationSchema),
  tryCatchWrapper(createContact)
);

router.delete("/:id", tryCatchWrapper(deleteContact));

router.put(
  "/:id",
  validateBody(validationSchema),
  tryCatchWrapper(changeContact)
);

module.exports = router;

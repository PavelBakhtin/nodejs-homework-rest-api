const express = require("express");
const router = express.Router();
const {
  getContacts,
  changeContact,
  deleteContact,
  createContact,
  getContact,
  updateStatusContact,
} = require("../../controllers/controllers");
const {
  validationSchema,
  validationFavSchema,
} = require("../../schemas/validateContact");
const { validateBody } = require("../../middleware/index");
const { tryCatchWrapper } = require("../../utilities/index");
const { authMiddleware } = require("../../middleware/authMiddleware");

router.use(tryCatchWrapper(authMiddleware));

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

router.patch(
  "/:id/favorite",
  validateBody(validationFavSchema),
  tryCatchWrapper(updateStatusContact)
);

module.exports = router;

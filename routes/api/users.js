const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  getCurrent,
  changeSub,
} = require("../../controllers/authControllers");
const { tryCatchWrapper } = require("../../utilities/index");
const { validateBody } = require("../../middleware/validationMiddleware");
const { userValidationSchema } = require("../../schemas/validateUser");
const { authMiddleware } = require("../../middleware/authMiddleware");
const { uploadMiddleware } = require("../../middleware/uploadMiddleware");
const { uploadAvatars } = require("../../controllers/avatarsController");
router.post(
  "/signup",
  validateBody(userValidationSchema),
  tryCatchWrapper(signup)
);

router.post(
  "/login",
  validateBody(userValidationSchema),
  tryCatchWrapper(login)
);

router.get("/logout", tryCatchWrapper(authMiddleware), tryCatchWrapper(logout));

router.get(
  "/current",
  tryCatchWrapper(authMiddleware),
  tryCatchWrapper(getCurrent)
);
router.patch("/", tryCatchWrapper(authMiddleware), tryCatchWrapper(changeSub));

router.patch(
  "/avatars",
  [authMiddleware, uploadMiddleware.single("avatar")],
  tryCatchWrapper(uploadAvatars)
);
module.exports = router;

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { nanoid } = require("nanoid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./tmp"));
  },
  filename: (req, file, cb) => {
    const [filename, extension] = file.originalname.split(".");
    cb(null, `${nanoid(10)}${filename}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });

router.use("/", express.static("./public/avatars"));

module.exports = { router, uploadMiddleware };

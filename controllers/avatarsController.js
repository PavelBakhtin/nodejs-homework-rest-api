const Jimp = require("jimp");
const { User } = require("../models/user");
const path = require("path");
const fs = require("fs/promises");

const uploadAvatars = async (req, res, next) => {
  const { filename } = req.file;
  const { _id } = req.user;
  console.log(filename);
  try {
    const tmpPath = path.resolve(__dirname, "../tmp", filename);
    console.log(tmpPath);
    await Jimp.read(tmpPath).then((image) => {
      return image.resize(250, 250).write(tmpPath);
    });

    const newPath = path.resolve(__dirname, "../public/avatars", filename);
    await fs.rename(tmpPath, newPath);
    await User.findByIdAndUpdate(_id, { avatarURL: newPath + filename });
    return res.status(200).json({
      avatarURL: filename,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = { uploadAvatars };

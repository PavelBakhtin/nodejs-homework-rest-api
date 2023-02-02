const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Conflict, BadRequest } = require("http-errors");
const gravatar = require("gravatar");

const signup = async (req, res, next) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const savedUser = await User.create({
      email,
      password: hashedPassword,
      avatarURL: gravatar.url(email),
    });

    res.status(201).json({
      user: {
        email: savedUser.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw Conflict("Email in use");
    }
    throw error;
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const storedUser = await User.findOne({
    email,
  });
  if (!storedUser) {
    throw BadRequest("Email or password is wrong");
  }
  const matchingUserData = await bcrypt.compare(password, storedUser.password);
  if (!matchingUserData) {
    throw BadRequest("Email or password is wrong");
  }
  const token = jwt.sign({ _id: storedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  await User.findByIdAndUpdate(storedUser._id, { token });
  res.status(200).json({
    token: token,
    user: {
      email: storedUser.email,
      subscription: "starter",
    },
  });
};
const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  req.user = {};
  console.log(_id);
  return res.status(204).json({ message: "No Content" });
};
const getCurrent = async (req, res, next) => {
  const { _id } = req.user;
  const storedUser = await User.findById(_id);
  return res.status(200).json({
    email: storedUser.email,
    subscription: storedUser.subscription,
  });
};
const changeSub = async (req, res, next) => {
  const { _id } = req.user;
  const subsType = req.body.subscription;
  const viableOptions = ["starter", "pro", "business"];
  if (!subsType || !viableOptions.includes(subsType)) {
    console.log("Wrong subscription type");
    throw BadRequest("Wrong subscription type");
  }
  const user = await User.findByIdAndUpdate(_id, { subscription: subsType });
  return res.status(200).json({
    email: user.email,
    subscription: subsType,
  });
};

module.exports = { signup, login, logout, getCurrent, changeSub };

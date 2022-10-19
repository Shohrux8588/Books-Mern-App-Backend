const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: "Invalid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).send({ error: "Password is not strong." });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ email, password: hashedPassword });

    const token = createToken(user._id);

    return res.status(200).json({ email, token, role: user.role });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: "Invalid credentials" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).send({ error: "Invalid credentials" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = createToken(user._id);

    return res.status(200).send({ email, token, role: user.role });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = {
  signUp,
  login,
};

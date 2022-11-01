const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Users = require("../models/usersModel.js");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

const signUp = async (req, res) => {
  const { email, password } = req.body;

  const role = req.body.role || "user";

  if (!validator.isEmail(email)) {
    return res.status(400).send({ error: "Invalid email" });
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).send({ error: "Password is not strong." });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({ email, password: hashedPassword, role });

    const token = createToken(user._id);

    return res
      .status(200)
      .json({
        email,
        token,
        role: user.role,
        _id: user._id,
        blocked: user.blocked,
      });
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
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).send({ error: "Invalid credentials" });
    }

    const token = createToken(user._id);

    return res
      .status(200)
      .send({
        email,
        token,
        role: user.role,
        _id: user._id,
        blocked: user.blocked,
      });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const users = await Users.find()
      .sort({ updatedAt: -1 })
      .limit(req.params.limit);

    return res.status(200).send(users);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body.editedUser },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const deletedUser = await Users.findByIdAndRemove(req.params.id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  login,
  fetchUsers,
  editUser,
  deleteUser,
};

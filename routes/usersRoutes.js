const express = require("express");
const router = express.Router();

const {
  signUp,
  login,
  fetchUsers,
  editUser,
  deleteUser,
} = require("../controllers/usersControllers");
const requireAdminAuth = require("../middleware/requireAdminAuth");
const requireAuth = require("../middleware/requireAuth");

router.post("/signup", signUp);

router.post("/login", login);

router.get("/", fetchUsers);

router.get("/:limit", fetchUsers);

router.use(requireAuth);

router.use(requireAdminAuth);

router.post("/:id", editUser);

router.delete("/:id", deleteUser);

module.exports = router;

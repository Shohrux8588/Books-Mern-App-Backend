const express = require("express");
const router = express.Router();

const {
  fetchCollections,
  createCollection,
  editCollection,
  deleteCollection,
  fetchCollection,
} = require("../controllers/collectionsControllers");
const requireAuth = require("../middleware/requireAuth");

router.get("/", fetchCollections);

router.get("/:id", fetchCollection);

router.use(requireAuth);

router.post("/", createCollection);

router.post("/:id", editCollection);

router.delete("/:id", deleteCollection);

module.exports = router;

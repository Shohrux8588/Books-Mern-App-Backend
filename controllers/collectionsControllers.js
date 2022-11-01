const Collections = require("../models/collectionsModel");

const createCollection = async (req, res) => {
  try {
    const collection = await Collections.create({
      ...req.body,
      likes: [],
      comments: [],
    });
    return res.status(200).json(collection);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const editCollection = async (req, res) => {
  try {
    const updatedCollection = await Collections.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedCollection);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const deleteCollection = async (req, res) => {
  try {
    const deletedCollection = await Collections.findByIdAndRemove(
      req.params.id
    );
    return res.status(200).json(deletedCollection);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const fetchCollections = async (req, res) => {
  try {
    const allCollections = await Collections.find().sort({ updatedAt: -1 });
    return res.status(200).json(allCollections);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const fetchCollection = async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await Collections.findById(id);
    return res.status(200).json(collection);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

module.exports = {
  createCollection,
  editCollection,
  deleteCollection,
  fetchCollections,
  fetchCollection,
};

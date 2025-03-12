const Bug = require('../models/Bug');

const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.json(bugs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBug = async (req, res) => {
  const { title, description, severity } = req.body;
  try {
    const newBug = new Bug({ title, description, severity });
    await newBug.save();
    res.status(201).json(newBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateBug = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBug = await Bug.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedBug);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBug = async (req, res) => {
  const { id } = req.params;
  try {
    await Bug.findByIdAndDelete(id);
    res.json({ message: 'Bug deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getBugs, createBug, updateBug, deleteBug };
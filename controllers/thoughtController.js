const { Thought, User } = require('../models');

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => {
        res.json(thoughts);
      })
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughts) => {
        res.json(thoughts);
      })
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thoughts._id } },
          { new: true }
        );
      })
      .then((users) => {
        res.json({ message: 'Thought created!' });
      })
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
      .then((thoughts) => {
        res.json(thoughts);
      })
  },

  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughts) => {
        return User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((users) => {
        res.json({ message: 'Thought deleted!' });
      })
  },
};

module.exports = thoughtController;

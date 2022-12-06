const { User, Thought } = require('../models');

const userController = {

  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((users) => {
        res.json(users);
      })
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((users) => {
        res.json(users);
      })
  },

  createUser(req, res) {
    User.create(req.body)
      .then((users) => {
        res.json(users);
      })
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((users) => {
        res.json(users);
      })
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then(() => {
        res.json({ message: 'User and thoughts deleted!' });
      })
  },

  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true })
      .then((users) => {
        res.json(users);
      })

  },

  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
      .then((users) => {
        res.json(users);
      })
  },
};

module.exports = userController;

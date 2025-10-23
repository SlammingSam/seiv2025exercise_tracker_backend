const db = require("../models/index.js")
const Goal = db.goal;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Lesson
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Lesson
  const goal = {
    user_id: req.body.userId,
    goal_id: req.body.goalId,
    name: req.body.name,
    status: req.body.status,
  };
  // Save Goal in the database
  Goal.create(goal)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Lesson.",
      });
    });
};
// Retrieve all goals from the database.
exports.findAll = (req, res) => {
  const goalId = req.params.goalId;
  var condition = goalId
    ? {
        goalId: {
          [Op.like]: `%${goalId}%`,
        },
      }
    : null;

  Goal.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    });
};
// Retrieve all goals for a user from the database.
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;

  Goal.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    });
};
// Find a single goal_id with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Goal.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Lesson with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Lesson with id=" + id,
      });
    });
};
// Update a Goal by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Goal.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Lesson with id=${id}. Maybe Lesson was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Lesson with id=" + id,
      });
    });
};
// Delete a Lesson with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Lesson.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lesson was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Lesson with id=" + id,
      });
    });
};



export default exports;

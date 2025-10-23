const db = require("../models/index.js")
const Exercise_Plan = db.exercise_plan;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Exercise Plan
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Exercise Plan
  const exercise_plan = {
    plan_id: req.body.plan_id,
    exercise_plan_id: req.body.exercise_planId,
    goal_id: req.body.goal_id
  };
  // Save Exercise_Plan in the database
  Exercise_Plan.create(exercise_plan)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Exercise Plan.",
      });
    });
};
// Retrieve all Exercise_Plans from the database.
exports.findAll = (req, res) => {

  Exercise_Plan.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exercise Plans.",
      });
    });
};
// Retrieve all Exercise_Plans for a goal from the database.
exports.findAllForUser = (req, res) => {
  const goalId = req.params.goalId;

  Exercise_Plan.findAll({ where: { goalId: goalId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exercise Plans.",
      });
    });
};
// Find a single Exercise_Plan_id with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Exercise_Plan.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Exercise Plan with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Exercise Plan with id=" + id,
      });
    });
};
// Update a Exercise_Plan by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Exercise_Plan.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Exercise Plan was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Exercise Plan with id=${id}. Maybe Exercise Plan was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Exercise Plan with id=" + id,
      });
    });
};
// Delete a Exercise Plan with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Exercise_Plan.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Exercise Plan was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Exercise Plan with id=${id}. Maybe Exercise Plan was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Exercise Plan with id=" + id,
      });
    });
};



export default exports;

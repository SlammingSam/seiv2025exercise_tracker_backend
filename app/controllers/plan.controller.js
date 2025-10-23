const db = require("../models/index.js")
const Plan = db.plan;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new plan
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a plan
  const plan = {
    plan_id: req.body.userId,
    description: req.body.goalId,
    name: req.body.name,
  };
  // Save Goal in the database
  Plan.create(plan)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the plans.",
      });
    });
};
// Retrieve all goals from the database.
exports.findAll = (req, res) => {
  const planId = req.params.planId;
  
  Plan.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving plans.",
      });
    });
};
// Retrieve all goals for a user from the database.
exports.findAllForExercisePlan = (req, res) => {
  const exercisePlanId = req.params.exercisePlanId;

  Plan.findAll({ where: { exercisePlanId: exercisePlanId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving plans.",
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
          message: `Cannot find plan with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving plan with id=" + id,
      });
    });
};
// Update a Goal by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Plan.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "plan was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update plan with id=${id}. Maybe plan was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating plan with id=" + id,
      });
    });
};
// Delete a plan with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  plan.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "plan was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete plan with id=${id}. Maybe plan was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete plan with id=" + id,
      });
    });
};



export default exports;

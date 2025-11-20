import db from"../models/index.js"
const Exercise = db.exercise;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new exercise
exports.create = (req, res) => {
  // Validate request

  // Create a exercise
  const exercise = {
    name: req.body.name,
    sets: req.body.sets,
    reps: req.body.reps,
    status: req.body.status,
    exercise_plan_id: req.body.exercise_plan_id,
  };
  // Save exercise in the database
  Exercise.create(exercise)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the exercise.",
      });
    });
};
// Retrieve all exercises from the database.
exports.findAll = (req, res) => {


  Exercise.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving exercises.",
      });
    });
};
// Retrieve all exercises for a exercise plan from the database.
exports.findAllForExercisePlan = (req, res) => {
 const exercisePlanId = req.params.exercisePlanId;
  Exercise.findAll({ where: { exercise_plan_id: exercisePlanId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving exercises.",
      });
    });
};
// Find a single exercise_id with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Exercise.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find exercise with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving exercise with id=" + id,
      });
    });
};
// Update a exercise by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Exercise.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "exercise was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update exercise with id=${id}. Maybe exercise was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating exercise with id=" + id,
      });
    });
};
// Delete a exercise with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Exercise.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "exercise was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete exercise with id=${id}. Maybe exercise was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete exercise with id=" + id,
      });
    });
};



export default exports;

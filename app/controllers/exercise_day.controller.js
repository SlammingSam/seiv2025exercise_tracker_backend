import e from "express";
import db from"../models/index.js"
const Exercise_Day = db.exercise_day;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Exercise_Day
exports.create = (req, res) => {
  // Validate request

  // Create a Exercise_Day
  const exercise_day = {
   day: req.body.day,
    exercise_id: req.body.exercise_id,
    exercise_plan_id: req.body.exercise_plan_id
  }
  // Save Exercise_Day in the database
  Exercise_Day.create(exercise_day)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Exercise_Day.",
      });
    });
};
// Retrieve all Exercise_Days from the database.
exports.findAll = (req, res) => {


  Exercise_Day.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exercise_Days.",
      });
    });
};
// Retrieve all Exercise_Days for a Exercise_Day plan from the database.
exports.findAllForExercise_DayPlan = (req, res) => {
 const Exercise_DayPlanId = req.params.Exercise_DayPlanId;
  Exercise_Day.findAll({ where: { Exercise_Day_plan_id: Exercise_DayPlanId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Exercise_Days.",
      });
    });
};
// Find a single Exercise_Day_id with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Exercise_Day.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Exercise_Day with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Exercise_Day with id=" + id,
      });
    });
};

// Get all exercise days (and exercises) for an exercise_plan
exports.findAllForExercisePlan = async (req, res) => {
  try {
    const exercisePlanId = req.params.exercise_plan_id;

    const days = await Exercise_Day.findAll({
      where: { exercise_plan_id: exercisePlanId },
      include: [
        {
          model: Exercise,
          as: "exercise",  // MUST match association
          attributes: ["id", "name", "sets", "reps", "status"]
        }
      ],
      order: [["day", "ASC"]] // optional sorting
    });

    res.send(days);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Failed to retrieve exercise days."
    });
  }
};

// Update a Exercise_Day by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Exercise_Day.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Exercise_Day was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Exercise_Day with id=${id}. Maybe Exercise_Day was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Exercise_Day with id=" + id,
      });
    });
};
// Delete a Exercise_Day with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Exercise_Day.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Exercise_Day was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Exercise_Day with id=${id}. Maybe Exercise_Day was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Exercise_Day with id=" + id,
      });
    });
};



export default exports;

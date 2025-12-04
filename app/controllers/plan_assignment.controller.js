import db from "../models/index.js"
import express, { json, urlencoded } from "express"
const Plan_Assignment = db.plan_assignment;
const Op = db.Sequelize.Op;
const exports = {};


exports.create = async (req, res) => {
  try {
    const plan_assignment = {
      id: req.body.id,
      team_id: req.body.team_id,
      exercise_plan_id: req.body.exercise_plan_id,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    };

    // 1. create assignment
    const assignment = await Plan_Assignment.create(plan_assignment);

    // 2. get all users on this team
    const members = await db.user.findAll({
      where: { team_id: assignment.team_id }
    });
    
    // 3. get all exercise_days in this exercise plan
    const days = await db.exercise_day.findAll({
      where: { exercise_plan_id: assignment.exercise_plan_id }
    });

    for (const member of members) {
      for (const day of days) {

        // Check if status is already created
        const exists = await db.exercise_status.findOne({
          where: {
            user_id: member.id,
            exercise_day_id: day.id
          }
        });

        if (!exists) {
          console.log("creating")
          await db.exercise_status.create({
            user_id: member.id,
            exercise_day_id: day.id,
            status: "not started"
          });
        }
      }
    }

    res.send(assignment);

  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Plan_Assignment."
    });
  }
};



exports.findByTeam = async (req, res) => {
  try {
    const teamId = req.params.team_id;

    const plans = await Plan_Assignment.findAll({
      where: { team_id: teamId }
    });

    res.send(plans);
  }
  catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to retrieve plan assignments." });
  }
};


// Retrieve all goals from the database.
exports.findAll = (req, res) => {
  const Plan_AssignmentId = req.params.Plan_AssignmentId;
  
  Plan_Assignment.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Plan_Assignments.",
      });
    });
};
// Retrieve all goals for a user from the database.
exports.findAllForExercisePlan_Assignment = (req, res) => {
  const exercisePlan_AssignmentId = req.params.exercisePlan_AssignmentId;

  Plan_Assignment.findAll({ where: { exercisePlan_AssignmentId: exercisePlan_AssignmentId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Plan_Assignments.",
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
          message: `Cannot find Plan_Assignment with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Plan_Assignment with id=" + id,
      });
    });
};
// Update a Goal by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Plan_Assignment.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Plan_Assignment was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Plan_Assignment with id=${id}. Maybe Plan_Assignment was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Plan_Assignment with id=" + id,
      });
    });
};
// Delete a Plan_Assignment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Plan_Assignment.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Plan_Assignment was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Plan_Assignment with id=${id}. Maybe Plan_Assignment was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Plan_Assignment with id=" + id,
      });
    });
};



export default exports;

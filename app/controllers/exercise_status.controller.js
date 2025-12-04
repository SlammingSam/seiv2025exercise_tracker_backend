import db from "../models/index.js";

const Exercise_Status = db.exercise_status;
const Exercise_Day = db.exercise_day;
const Exercise = db.exercise;

const exports = {};


exports.create = async (req, res) => {
  try {
    const { 
      user_id,
      exercise_day_id, 
      status 
    } = req.body;

    const exists = await Exercise_Status.findOne({
      where: { user_id, exercise_day_id },
    });

    if (exists) {
      return res.status(400).send({
        message: "Status already exists for this user and exercise day.",
      });
    }

    const created = await Exercise_Status.create({
      user_id,
      exercise_day_id,
      status,
    });

    res.send(created);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Failed to create exercise status.",
    });
  }
};


exports.findForPlanAndUser = async (req, res) => {
  try {
    const { planId, userId } = req.params;

    const days = await db.exercise_day.findAll({
      where: { exercise_plan_id: planId },
      include: [
        {
          model: db.exercise,
          as: "exercise",
          attributes: ["id", "name", "sets", "reps"]
        }
      ]
    });
    const results = [];

    for (const day of days) {
      const status = await db.exercise_status.findOne({
        where: {
          exercise_day_id: day.id,
          user_id: userId
        },
        attributes: ["id", "status"]
      });

      results.push({
        ...day.toJSON(),
        status: status ? status.status : "not started",
        status_id: status ? status.id : null
      });
    }

    res.send(results);

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to get user exercise statuses." });
  }
};



exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const row = await Exercise_Status.findByPk(id);

    if (!row) {
      return res.status(404).send({ message: "Exercise status not found." });
    }

    res.send(row);
  } catch (err) {
    res.status(500).send({
      message: "Failed to retrieve exercise status.",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Exercise_Status.update(req.body, { where: { id } });

    if (result == 1) {
      res.send({ message: "Exercise status updated successfully." });
    } else {
      res.send({
        message:
          "Unable to update exercise status. Maybe it does not exist or request body is empty.",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Failed to update exercise status.",
    });
  }
};


exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await Exercise_Status.destroy({ where: { id } });

    if (result === 1) {
      res.send({ message: "Exercise status deleted successfully." });
    } else {
      res.send({
        message: "Unable to delete exercise status. Maybe it was not found.",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Failed to delete exercise status.",
    });
  }
};

export default exports;

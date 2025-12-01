import db from"../models/index.js"
const Team = db.team;
const Op = db.Sequelize.Op;
const exports = {};
// Create and Save a new Team
exports.create = (req, res) => {
  // Validate request


  // Create a Lesson
  const team = {
    user_id: req.body.user_id,
    name: req.body.name,
  };
  // Save Team in the database
  Team.create(team)
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
// Retrieve all Teams from the database.
exports.findAll = (req, res) => {
  Team.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    });
};
// Retrieve all Teams for a user from the database.
exports.findAllForUser = (req, res) => {
  const userId = req.params.userId;

  Team.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving lessons.",
      });
    });
};
// Find a single Team_id with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Team.findByPk(id)
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
// Update a Team by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Team.update(req.body, {
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
  Team.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Team was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Team with id=${id}. Maybe Team was not found!`,
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

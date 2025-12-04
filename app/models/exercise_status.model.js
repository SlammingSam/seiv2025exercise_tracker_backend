import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise_Status = SequelizeInstance.define("exercise_status", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },

  exercise_day_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "exercise_days",
      key: "id",
    },
  },

  status: {
    type: Sequelize.ENUM,
    values: ["complete", "in-progress", "not started"],
    defaultValue: "not started",
  },
});

export default Exercise_Status;

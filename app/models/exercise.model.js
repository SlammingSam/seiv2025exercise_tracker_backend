import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise = SequelizeInstance.define("exercise", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    exercise_plan_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'exercise_plans',
        key: 'exercise_plan_id',
      },
    },
    name: {
      type: Sequelize.STRING,
    },
    sets: {
      type: Sequelize.INTEGER,
    },
    reps: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['complete', 'in-progress', 'not started'],
      allowNull: true,
      defaultValue: 'not started',
    },
    date: {
      type: Sequelize.ENUM,
      values: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      allowNull: true,
      defaultValue: null,

    }
  });
   
export default Exercise;
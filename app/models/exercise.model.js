import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise = SequelizeInstance.define("exercise", {
    exercise_id: {
      type: Sequelize.STRING,
      primaryKey: true
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
  });
   
export default Exercise;
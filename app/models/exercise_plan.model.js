import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise = SequelizeInstance.define("exercise", {
    exercise_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      references:{
        model: 'exercise',
        key: 'exercise_id',
      }
    },
    plan_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      references:{
        model: 'plan',
        key: 'plan_id',
      }
    },
    goal_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      references:{
        model: 'goal',
        key: 'goal_id',
      }
    },
  });
   
export default Exercise;
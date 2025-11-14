import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise = SequelizeInstance.define("exercise_plan", {
    exercise_plan_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    plan_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references:{
        model: 'plans',
        key: 'plan_id',
      }
    },
    goal_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references:{
        model: 'goals',
        key: 'goal_id',
      }
    },
  });
   
export default Exercise;
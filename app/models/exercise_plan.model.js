import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise_Plan = SequelizeInstance.define("exercise_plan", {
    exercise_plan_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    plan_id: {
      type: Sequelize.INTEGER,
      references:{
        model: 'plans',
        key: 'plan_id',
      }
      defaultValue: null;
    },
    goal_id: {
      type: Sequelize.INTEGER,
      references:{
        model: 'goals',
        key: 'goal_id',
      }
    },
  });
   
export default Exercise_Plan;
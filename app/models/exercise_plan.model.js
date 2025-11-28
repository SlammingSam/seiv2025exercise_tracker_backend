import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise_Plan = SequelizeInstance.define("exercise_plan", {
    exercise_plan_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,

      autoIncrement: true //cant auto increment a composite key JULIANNNNNNNNNNNNNNNNNNNNNNNNNNNNNN!
    },
    plan_id: {
      type: Sequelize.INTEGER,
      //primaryKey: true,
 allowNull: true,
      defaultValue: null,
      references:{
        model: 'plans',
        key: 'id',
      }
    },
    goal_id: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.INTEGER,
      references:{
        model: 'goals',
        key: 'goal_id',
      },
    
         user_id: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.INTEGER,
      references:{
        model: 'goals',
        key: 'goal_id',
      },
      
    },
  }
  });
   
export default Exercise_Plan;
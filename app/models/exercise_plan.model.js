import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise_Plan = SequelizeInstance.define("exercise_plan", {
    id: {
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
    //discuss whether you want exercise plans to have multiple goals. 
    goal_id: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.INTEGER,
      references:{
        model: 'goals',
        key: 'id',
      },

    },
    
         user_id: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.INTEGER,
      references:{
        model: 'users',
        key: 'id',
      },
    },
    
         exercise_plan_id: {
      allowNull: true,
      defaultValue: null,
      type: Sequelize.INTEGER,
      references:{
        model: 'exercise_plans',
        key: 'id',
      },
    },
         
  });
   
export default Exercise_Plan;
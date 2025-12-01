import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Plan_Assignment = SequelizeInstance.define("plan_assignment", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true //cant auto increment a composite key JULIANNNNNNNNNNNNNNNNNNNNNNNNNNNNNN!
    },
    team_id: {
      type: Sequelize.INTEGER,
      //primaryKey: true,
 allowNull: true,
      defaultValue: null,
      references:{
        model: 'teams',
        key: 'id',
      }
    },
    exercise_plan_id: {
      type: Sequelize.INTEGER,
      //primaryKey: true,
 allowNull: true,
      defaultValue: null,
      references:{
        model: 'exercise_plans',
        key: 'id',
      }
    },
    //discuss whether you want exercise plans to have multiple goals. 
     start_date: {
      type: Sequelize.INTEGER,
      primaryKey: true,
     
    },
     end_date: {
      type: Sequelize.INTEGER,
      primaryKey: true,
   
    },
         
  });
   
export default Plan_Assignment;
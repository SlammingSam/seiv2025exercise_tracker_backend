import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise_Day = SequelizeInstance.define("exercise_day", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    exercise_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'exercises',
        key: 'id',
      },
    },
    exercise_plan_id: {
      allowNull: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'exercise_plans',
        key: 'id',
      },
    },
  
    day: {
          type: Sequelize.ENUM,
          values: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          allowNull: true,
          defaultValue: 'Sunday',
        },
  });
   
export default Exercise_Day;
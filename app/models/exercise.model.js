import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Exercise = SequelizeInstance.define("exercise", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  });
   
export default Exercise;
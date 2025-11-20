import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Goal = SequelizeInstance.define("goal", {
    user_id: {
          type: Sequelize.INTEGER,
          references:{
            model: 'users',
            key: 'id',
          }
        },
    goal_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: Sequelize.ENUM,
      values: ['complete', 'in-progress', 'not started'],
      allowNull: true,
      defaultValue: 'not started',
    },
    name: {
      type: Sequelize.STRING,
    },
  });
   
export default Goal;

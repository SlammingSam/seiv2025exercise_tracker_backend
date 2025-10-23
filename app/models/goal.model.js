import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Goal = SequelizeInstance.define("goal", {
    user_id: {
          type: Sequelize.STRING,
          primaryKey: true,
          references:{
            model: 'user',
            key: 'id',
          }
        },
    goal_id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    status: {
      type: Sequelize.ENUM,
      values: ['complete', 'in-progress', 'not started'],
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
   
export default Goal;

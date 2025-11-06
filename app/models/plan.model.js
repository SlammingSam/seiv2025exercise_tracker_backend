import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Plan = SequelizeInstance.define("plan", {
    plan_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
  });

export default Plan;

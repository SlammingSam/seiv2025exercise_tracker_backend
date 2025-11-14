import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Team = SequelizeInstance.define("team", {
    // optional owner/user reference - don't declare DB-level FK here to avoid circular
    // dependency at sync time. Association/constraint will be defined in `models/index.js`.
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    team_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  })
   
export default Team;

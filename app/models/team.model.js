import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const Team = SequelizeInstance.define("team", {
    // optional owner/user reference - don't declare DB-level FK here to avoid circular
    // dependency at sync time. Association/constraint will be defined in `models/index.js`.
    //owner of the team
        id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    //the id of the team

    name: {
      type: Sequelize.STRING,
    },

  })
   
export default Team;

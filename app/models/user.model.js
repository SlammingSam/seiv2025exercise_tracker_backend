import Sequelize from "sequelize";
import SequelizeInstance from "../config/sequelizeInstance.js";

const User = SequelizeInstance.define("user", {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  team_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
            model: 'teams',
            key: 'team_id',
          }
        },
  
  fName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: Sequelize.ENUM,
    values:['Athlete', 'Coach', 'Unset'],
    allowNull: true,
    defaultValue: 'Unset'
  },
  picture: {
    type: Sequelize.STRING,
  }
  // refresh_token: {
  //   type: Sequelize.STRING(512),
  //   allowNull: true
  // },
  // expiration_date: {
  //   type: Sequelize.DATE,
  //   allowNull: true
  // },
});

export default User;


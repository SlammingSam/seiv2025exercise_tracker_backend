import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models

import User from "./user.model.js";
import Session from "./session.model.js";
import Goal from "./goal.model.js";
import Plan from "./plan.model.js"; 
import Exercise from "./Exercise.model.js";
import Exercise_Plan from "./exercise_plan.model.js"


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.goal = Goal;
db.plan = Plan;
db.exercise = Exercise;
db.exercise_plan = Exercise_Plan;

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

// foreign key for goals
db.user.hasMany(
  db.goal,
  { as: "goal" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.goal.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
//foreign key for plans
db.user.hasMany(
  db.plan,
  { as: "plan" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.plan.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

//foreign key for exercise plans
db.goal.hasMany(
  db.exercise_plan
  { as: "exercise plan" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.exercise_plan.belongsTo(
  db.goal,
  { as: "goal" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);




export default db;

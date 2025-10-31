
import { Sequelize } from "sequelize";
import sequelize from "../config/sequelizeInstance.js";

// Models
//on Delete


import User from "./user.model.js";
import Session from "./session.model.js";
import Goal from "./goal.model.js";
import Plan from "./plan.model.js"; 
import Exercise from "./exercise.model.js";
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
// foreign key for session
db.user.hasMany(db.session, { as: "session", foreignKey: "user_id", onDelete: "CASCADE", foreignKeyConstraint: true });
db.session.belongsTo(db.user, { as: "user", foreignKey: "user_id", onDelete: "CASCADE", foreignKeyConstraint: true });

// foreign key for goals
// foreign key for goals
db.user.hasMany(db.goal, { as: "goal", foreignKey: "user_id", onDelete: "CASCADE", foreignKeyConstraint: true });
db.goal.belongsTo(db.user, { as: "user", foreignKey: "user_id", onDelete: "CASCADE", foreignKeyConstraint: true });
//foreign key for plans
// foreign key for plans
db.user.hasMany(db.plan, { as: "plan", foreignKey: "user_id", onDelete: "CASCADE", foreignKeyConstraint: true });
db.plan.belongsTo(db.user, { as: "user", foreignKey: "user_id", onDelete: "CASCADE", foreignKeyConstraint: true });

//foreign key for exercise plans
// foreign key for exercise plans
db.goal.hasMany(db.exercise_plan, { as: "exercise_plan", foreignKey: "goal_id", onDelete: "CASCADE", foreignKeyConstraint: true });
db.exercise_plan.belongsTo(db.goal, { as: "goal", foreignKey: "goal_id", onDelete: "CASCADE", foreignKeyConstraint: true });




export default db;

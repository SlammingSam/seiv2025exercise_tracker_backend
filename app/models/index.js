
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
import Exercise_Day from "./exercise_day.model.js"
import Team from "./team.model.js";
import Plan_Assignment from "./plan_assignment.model.js";


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = User;
db.session = Session;
db.goal = Goal;
db.plan = Plan;
db.exercise_plan = Exercise_Plan;
db.exercise = Exercise;
db.exercise_day = Exercise_Day;
db.team = Team;
db.plan_assignment = Plan_Assignment

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
db.exercise_plan.belongsTo(db.plan, { as: "plan", foreignKey: "plan_id" });
db.plan.hasMany(db.exercise_plan, { as: "exercise_plans", foreignKey: "plan_id" });

db.user.hasMany(db.exercise_plan, { as: "user", foreignKey: "user_id", onDelete: "CASCADE", foreignKeyConstraint: true });
//foreign key for exercise plans
// foreign key for exercise plans
db.goal.hasMany(db.exercise_plan, { as: "exercise_plan", foreignKey: "goal_id", onDelete: "CASCADE", foreignKeyConstraint: true, allowNull: true});
db.exercise_plan.belongsTo(db.goal, { as: "goal", foreignKey: "goal_id", onDelete: "CASCADE", foreignKeyConstraint: true, allowNull: true });


// foreign key for teams
db.team.hasMany(db.user, { as: "users", foreignKey: "team_id", onDelete: "SET NULL", foreignKeyConstraint: true });
db.user.belongsTo(db.team, { as: "team", foreignKey: "team_id", onDelete: "SET NULL", foreignKeyConstraint: true });
// team may reference an owner user (user_id) but create the constraint without enforcing
// at sync time to avoid circular FK creation. This sets up the association but disables
// automatic constraint creation so Sequelize won't try to create both FKs in a cycle.



export default db;

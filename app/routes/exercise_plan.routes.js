  import exercise_plans from "../controllers/exercise_plan.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new exercise plan for a user
  router.post("/", exercise_plans.create);

  // Retrieve all exercise plans for a user
  router.get(
    "/:userId",
    exercise_plans.findAllForUser
  );

  // Retrieve a single exercise plan by ID
  router.get(
    "/:id",
    exercise_plans.findOne
  );

  //retrieve all exercise_plans
  router.get("/",  exercise_plans.findAll);

  // Update a goal with id
  router.put("/:id",  exercise_plans.update);

  // Delete a goal with id
  router.delete("/:id",  exercise_plans.delete);

export default router
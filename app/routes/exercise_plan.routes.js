  import goals from "../controllers/goal.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new goal for a user
  router.post("/exercise_plans/:userId", [authenticate], goals.create);

  // Retrieve all exercise plans for a user
  router.get(
    "/exercise_plans/:userId",
    [authenticate],
    goals.findAllForUser
  );

  // Retrieve a single exercise plan by ID
  router.get(
    "/exercise_plans/:id",
    [authenticate],
    goals.findOne
  );

  //retrieve all goals
  router.get("/exercise_plans/", [authenticate], goals.findAll);

  // Update a goal with id
  router.put("/exercise_plans/:id", [authenticate], goals.update);

  // Delete a goal with id
  router.delete("/exercise_plans/:id", [authenticate], goals.delete);

export default router
  import goals from "../controllers/goal.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new goal for a user
  router.post("/goals/:userId", [authenticate], goals.create);

  // Retrieve all goals for a user
  router.get(
    "/goals/:userId",
    [authenticate],
    goals.findAllForUser
  );

  // Retrieve a single goal by ID
  router.get(
    "/goals/:id",
    [authenticate],
    goals.findOne
  );

  //retrieve all goals
  router.get("/goals/", [authenticate], goals.findAll);

  // Update a goal with id
  router.put("/goals/:id", [authenticate], goals.update);

  // Delete a goal with id
  router.delete("/goals/:id", [authenticate], goals.delete);

export default router
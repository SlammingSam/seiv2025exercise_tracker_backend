  import goals from "../controllers/goal.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new goal for a user
  router.post("/:userId", [authenticate], goals.create);

  // Retrieve all exercise plans for a user
  router.get(
    "/:userId",
    [authenticate],
    goals.findAllForUser
  );

  // Retrieve a single exercise plan by ID
  router.get(
    "/:id",
    [authenticate],
    goals.findOne
  );

  //retrieve all goals
  router.get("/", [authenticate], goals.findAll);

  // Update a goal with id
  router.put("/:id", [authenticate], goals.update);

  // Delete a goal with id
  router.delete("/:id", [authenticate], goals.delete);

export default router
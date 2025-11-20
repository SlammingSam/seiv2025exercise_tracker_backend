  import goals from "../controllers/goal.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new goal 
  router.post("/", [authenticate], goals.create);
   router.get("/", [authenticate], goals.findAll);

  // Retrieve all goals for a user
  // Retrieve a single goal by ID
  router.get("/:id", [authenticate], goals.findOne);

  //retrieve all goals

  // Update a goal with id
  router.put("/:id", [authenticate], goals.update);

  // Delete a goal with id
  router.delete("/:id", [authenticate], goals.delete);

export default router
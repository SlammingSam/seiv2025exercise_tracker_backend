  import goals from "../controllers/goal.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new goal for a user
  router.post("/:userId", goals.create);

  // Retrieve all goals for a user
  router.get(
    "/:userId",
    
    goals.findAllForUser
  );

  // Retrieve a single goal by ID
  router.get(
    "/:id",
   
    goals.findOne
  );

  //retrieve all goals
  router.get("/",  goals.findAll);

  // Update a goal with id
  router.put("/:id",  goals.update);

  // Delete a goal with id
  router.delete("/:id",  goals.delete);

export default router
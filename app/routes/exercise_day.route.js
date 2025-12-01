  import exercise_days from "../controllers/exercise_day.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new exercise plan for a user
  router.post("/", exercise_days.create);


  // Retrieve a single exercise plan by ID
  router.get("/:id", [authenticate], exercise_days.findOne);

  //retrieve all exercise_days
  router.get("/",  [authenticate], exercise_days.findAll);

  // Update a goal with id
  router.put("/:id",  [authenticate], exercise_days.update);

  // Delete a goal with id
  router.delete("/:id",  [authenticate], exercise_days.delete);

export default router
  import exercises from "../controllers/exercise.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new plan
  router.post("/", [authenticate], exercises.create);

  // Retrieve all plans
  router.get(
    "/",
    [authenticate],
    exercises.findAll
  );

  // Retrieve all exercises from exercise plan
  router.get(
    "/exercises/exercise_planId",
    [authenticate],
    exercises.findAllForExercisePlan
  );

  //retrieve one exercise
  router.get("/:id", [authenticate], exercises.findOne);

  // Update an exercise
  router.put("/:id", [authenticate], exercises.update);

  // Delete a Lesson with id
  router.delete("/:id", [authenticate], exercises.delete);

export default router

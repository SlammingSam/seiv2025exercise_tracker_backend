  import exercises from "../controllers/exercise.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new plan
  router.post("/exercises", [authenticate], exercises.create);

  // Retrieve all plans
  router.get(
    "/exercises",
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
  router.get("/exercises/:id", [authenticate], exercises.findOne);

  // Update an exercise
  router.put("/exercise/:id", [authenticate], exercises.update);

  // Delete a Lesson with id
  router.delete("/exercise/:id", [authenticate], exercises.delete);

export default router

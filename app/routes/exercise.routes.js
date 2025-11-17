  import exercises from "../controllers/exercise.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new plan
  router.post("/", [authenticate],exercises.create);

  // Retrieve all plans
  router.get(
    "/", [authenticate],
    
    exercises.findAll
  );

  // Retrieve all exercises from exercise plan
  router.get(
    "/exercise_planId",
    exercises.findAllForExercisePlan
  );

  //retrieve one exercise
  router.get("/:id", exercises.findOne);
  // Update an exercise
  router.put("/:id", exercises.update);

  // Delete a Lesson with id
  router.delete("/:id", exercises.delete);

export default router

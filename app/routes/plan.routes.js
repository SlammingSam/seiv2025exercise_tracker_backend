  import plans from "../controllers/plan.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new plan
  router.post("/", [authenticate],  plans.create);

  // Retrieve all plans
  router.get(
    "/",
    plans.findAll
  );

  // Retrieve all plans from exercise plan
  router.get(
    "/:exercise_planId", 
    plans.findAllForExercisePlan
  );

  //retrieve one all plan
  router.get("/:id", plans.findOne);

  // Update a goal with id
  router.put("/:id", plans.update);

  // Delete a Lesson with id
  router.delete("/:id", plans.delete);

export default router

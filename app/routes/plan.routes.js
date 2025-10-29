  import plans from "../controllers/plan.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new plan
  router.post("/plans", [authenticate], plans.create);

  // Retrieve all plans
  router.get(
    "/plans/",
    [authenticate],
    plans.findAll
  );

  // Retrieve all plans from exercise plan
  router.get(
    "/plans/:exercise_planId",
    [authenticate],
    plans.findAllForExercisePlan
  );

  //retrieve one all plan
  router.get("/plans/:id", [authenticate], plans.findOne);

  // Update a goal with id
  router.put("/plans/:id", [authenticate], plans.update);

  // Delete a Lesson with id
  router.delete("/plans/:id", [authenticate], plans.delete);

export default router

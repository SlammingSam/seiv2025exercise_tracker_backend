  import plan_assignments from "../controllers/plan_assignment.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new plan
  // Retrieve all plan_assignments for a specific user

router.get("/team/:team_id", plan_assignments.findByTeam);

  router.post("/", plan_assignments.create);

  // Retrieve all plan_assignments
  router.get("/", plan_assignments.findAll);

  // Retrieve all plan_assignments from exercise plan


  //retrieve one all plan
  router.get("/:id", [authenticate], plan_assignments.findOne);

  // Update a goal with id
  router.put("/:id", [authenticate], plan_assignments.update);

  // Delete a Lesson with id
  router.delete("/:id", [authenticate], plan_assignments.delete);

export default router

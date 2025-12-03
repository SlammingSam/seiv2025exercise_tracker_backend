  import plans from "../controllers/plan.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new plan
  // Retrieve all plans for a specific user
router.get("/user/:userId", plans.findAllForUser);

  router.post("/", [authenticate], plans.create);

  // Retrieve all plans
  router.get("/", plans.findAll);

  // Retrieve all plans from exercise plan


  //retrieve one all plan
  router.get("/:id", [authenticate], plans.findOne);

  // Update a goal with id
  router.put("/:id", [authenticate], plans.update);

  // Delete a Lesson with id
  router.delete("/:id", [authenticate], plans.delete);

export default router

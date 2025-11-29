  import teams from "../controllers/team.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()

  // Create a new plan
  router.post("/", [authenticate], teams.create);

  // Retrieve all plans
  router.get("/", [authenticate], teams.findAll);


  //retrieve one all plan
  router.get("/:id", [authenticate], teams.findOne);

  // Update a goal with id
  router.put("/:id", [authenticate], teams.update);

  // Delete a Lesson with id
  router.delete("/:id", [authenticate], teams.delete);

export default router

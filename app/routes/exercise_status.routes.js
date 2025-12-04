import exercise_status from "../controllers/exercise_status.controller.js";
import authenticate from "../authorization/authorization.js";
import { Router } from "express";

const router = Router();

// Create a new status row
router.post("/", exercise_status.create);

// Get all statuses for a user for a specific exercise plan

router.get(
  "/plan/:planId/user/:userId",
  exercise_status.findForPlanAndUser
);

// Get one
router.get("/:id", [authenticate], exercise_status.findOne);

// Update
router.put("/:id", [authenticate], exercise_status.update);

// Delete
router.delete("/:id", [authenticate], exercise_status.delete);

export default router;

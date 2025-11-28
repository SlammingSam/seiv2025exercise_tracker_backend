import { Router } from "express";

import AuthRoutes from "./auth.routes.js";
import UserRoutes from "./user.routes.js";
import GoalRoutes from "./goal.routes.js";
import PlanRoutes from "./plan.routes.js";
import ExerciseRoutes from "./exercise.routes.js"
import ExercisePlanRoutes from "./exercise_plan.routes.js"
import TeamRoutes from "./team.routes.js"


const router = Router();

router.use("/", AuthRoutes);
router.use("/users", UserRoutes);
router.use("/goals", GoalRoutes);
router.use("/plans", PlanRoutes);
router.user("/teams", TeamRoutes)
router.use("/exercises", ExerciseRoutes);
router.use("/exercise_plans", ExercisePlanRoutes)

export default router;

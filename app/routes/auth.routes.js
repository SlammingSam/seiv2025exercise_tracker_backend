  import auth from "../controllers/auth.controller.js";
  import authenticate from "../authorization/authorization.js";
  import { Router } from "express";
  var router = Router()



  // Login
  router.post("/login" [authenticate], auth.login);

  // Authorization
  router.post("/authorize/:id" [authenticate], auth.authorize);

  // Logout
  router.post("/logout" [authenticate], auth.logout);

 export default router


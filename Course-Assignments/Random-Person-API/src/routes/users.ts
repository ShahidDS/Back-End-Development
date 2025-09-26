import { Router } from "express";
import { UserController } from "../controllers/userController.js";

const router = Router();

//router.post("/", UserController.createUser);
router.post(
  "/",
  (req, res, next) => {
    console.log("POST /api/users route was hit!");
    next(); // Pass control to the UserController
  },
  UserController.createUser
);
export default router;

import { Router } from "express";
import pingRoutes from "./ping.js";
import randomPersonRoutes from "./randomPerson.js";
import userRoutes from "./users.js";

const router = Router();

// Specific routes first
router.use("/users", userRoutes);
router.use("/ping", pingRoutes);

// General routes last
router.use("/", randomPersonRoutes);

export default router;

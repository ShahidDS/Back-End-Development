import { Router } from "express";
import { RandomUserController } from "../controllers/randomUserController";

const router = Router();

router.get("/random-person", RandomUserController.getRandomPerson);
router.get("/random-login", RandomUserController.getRandomLogin);
router.get("/random-address", RandomUserController.getRandomAddress);

export default router;

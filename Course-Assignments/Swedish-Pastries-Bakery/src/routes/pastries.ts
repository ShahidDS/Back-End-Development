import { Router } from "express";
import { PastryController } from "../controllers/pastryController.js";

const router = Router();

router.get("/", PastryController.getAllPastries);
router.get("/type/:type", PastryController.getPastriesByType);
router.get("/:id", PastryController.getPastryById);
router.post("/", PastryController.createPastry);
router.put("/:id", PastryController.updatePastry);
router.delete("/:id", PastryController.deletePastry);

export default router;

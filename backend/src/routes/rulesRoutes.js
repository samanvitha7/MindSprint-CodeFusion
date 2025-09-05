
import express from "express";
import { getRules, getRuleById } from "../controllers/rulesController.js";

const router = express.Router();

router.get("/", getRules);
router.get("/:id", getRuleById);

export default router;

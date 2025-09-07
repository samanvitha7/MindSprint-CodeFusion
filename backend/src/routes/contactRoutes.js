// src/routes/contactRoutes.js
import express from "express";
import { sendContactEmail } from "../controllers/simpleContactController.js";

const router = express.Router();

// POST /api/contact
router.post("/", sendContactEmail);

export default router;

import { Router, Request, Response } from "express";
import {
  createMedicalForm,
  getMedicalForms,
  getMedicalFormById,
  updateMedicalForm,
  deleteMedicalForm,
} from "../controllers/medicalForm.controller";

const router: Router = Router();

router.post("/", createMedicalForm);
router.get("/", getMedicalForms);
router.get("/:id", getMedicalFormById);
router.put("/:id", updateMedicalForm);
router.delete("/:id", deleteMedicalForm);

export default router;

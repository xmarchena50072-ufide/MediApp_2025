import { Router } from "express";
import {
  createCita,
  getCitas,
  updateCita,
  deleteCita,
} from "../controllers/citas.controller";

const router = Router();

router.post("/", createCita); // Crear una nueva cita
router.get("/", getCitas); // Obtener todas las citas
router.put("/:id", updateCita); // Actualizar una cita por ID
router.delete("/:id", deleteCita); // Eliminar una cita por ID

export default router;

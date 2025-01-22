import { Router } from "express";
import { createConsulta, getConsultas, deleteConsulta } from "../controllers/consultas.controller";

const router = Router();

router.post("/", createConsulta); // Crear una nueva consulta
router.get("/", getConsultas); // Obtener todas las consultas
router.delete("/:id", deleteConsulta); // Eliminar una consulta por ID

export default router;

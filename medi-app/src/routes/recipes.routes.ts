import { Router } from "express";
import { createRecipe, getRecipes, deleteRecipe } from "../controllers/recipes.controller";

const router = Router();

router.post("/", createRecipe); // Crear una nueva receta
router.get("/", getRecipes); // Obtener todas las recetas
router.delete("/:id", deleteRecipe); // Eliminar una receta por ID

export default router;

import { Request, Response } from "express";
import Recipe, { IRecipe } from "../models/recipe.model";
import { sendEmail } from "../services/email.service";
import { log } from "console";

// Crear una receta y enviar un correo
export const createRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
      const { paciente, fecha, medicamentos, correo, cedula } = req.body;
      const nuevaReceta = new Recipe({ paciente, fecha, medicamentos, correo, cedula });
      await nuevaReceta.save();
  
      // Enviar correo electrónico al paciente
      const subject = "Nueva Receta Médica";
      const text = `Hola ${paciente},\n\nTu receta médica ha sido generada.\n\nMedicamentos:\n${medicamentos}\n\nFecha: ${fecha}`;
      const html = `
        <h1>Hola ${paciente},</h1>
        <p>Tu receta médica ha sido generada.</p>
        <p><strong>Medicamentos:</strong></p>
        <p>${medicamentos}</p>
        <p><strong>Fecha:</strong> ${new Date(fecha).toLocaleDateString()}</p>
      `;
  
      await sendEmail(correo, subject, text, html);
  
      res.status(201).json({ message: "Receta médica creada y correo enviado", data: nuevaReceta });
    } catch (error) {
      res.status(500).json({ message: "Error al crear la receta médica", error });
    }
  };

// Obtener todas las recetas
export const getRecipes = async (_req: Request, res: Response): Promise<void> => {
  try {
    const recetas = await Recipe.find();
    res.status(200).json(recetas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las recetas médicas", error });
  }
};

// Eliminar una receta por ID
export const deleteRecipe = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const recetaEliminada = await Recipe.findByIdAndDelete(id);

    if (!recetaEliminada) {
      res.status(404).json({ message: "Receta médica no encontrada" });
      return;
    }

    res.status(200).json({ message: "Receta médica eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la receta médica", error });
  }
};

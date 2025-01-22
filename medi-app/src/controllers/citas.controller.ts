import { Request, Response } from "express";
import Cita, { ICita } from "../models/cita.model";

// Crear una nueva cita
export const createCita = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, fechaHora, descripcion } = req.body;

    // Validar si ya existe una cita con la misma fecha y hora
    const citaExistente = await Cita.findOne({ fechaHora });
    if (citaExistente) {
      res.status(400).json({
        message: "El horario ya está ocupado. Por favor, selecciona otro horario.",
      });
      return;
    }

    // Crear la nueva cita
    const nuevaCita = new Cita({ titulo, fechaHora, descripcion });
    await nuevaCita.save();

    res.status(201).json({ message: "Cita creada exitosamente", data: nuevaCita });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la cita", error });
  }
};

// Obtener todas las citas
export const getCitas = async (req: Request, res: Response) => {
  try {
    const citas = await Cita.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las citas", error });
  }
};

// Actualizar una cita
export const updateCita = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { titulo, fechaHora, descripcion } = req.body;
  
      const citaActualizada = await Cita.findByIdAndUpdate(
        id,
        { titulo, fechaHora, descripcion },
        { new: true }
      );
  
      if (!citaActualizada) {
        res.status(404).json({ message: "Cita no encontrada" });
        return;
      }
  
      res.status(200).json({ message: "Cita actualizada exitosamente", data: citaActualizada });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la cita", error });
    }
  };
  
  // Eliminar una cita
  export const deleteCita = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      const citaEliminada = await Cita.findByIdAndDelete(id);
  
      if (!citaEliminada) {
        res.status(404).json({ message: "Cita no encontrada" });
        return;
      }
  
      res.status(200).json({ message: "Cita eliminada exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la cita", error });
    }
  };

import { Request, Response } from "express";
import Consulta, { IConsulta } from "../models/consulta.model";

// Crear una nueva consulta
export const createConsulta = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      paciente,
      sistolica,
      diastolica,
      frecuenciaCardiaca,
      saturacionOxigeno,
      temperatura,
      motivo,
      fecha,
      correo,
      cedula
    } = req.body;

    const nuevaConsulta = new Consulta({
      paciente,
      doctor: "Marlon Jimenez",
      sistolica,
      diastolica,
      frecuenciaCardiaca,
      saturacionOxigeno,
      temperatura,
      motivo,
      fecha,
      correo,
      cedula
    });

    await nuevaConsulta.save();
    res.status(201).json({ message: "Consulta creada exitosamente", data: nuevaConsulta });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la consulta", error });
  }
};

// Obtener todas las consultas
export const getConsultas = async (req: Request, res: Response): Promise<void> => {
  try {
    const consultas = await Consulta.find();
    res.status(200).json(consultas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las consultas", error });
  }
};

// Eliminar una consulta por ID
export const deleteConsulta = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const consultaEliminada = await Consulta.findByIdAndDelete(id);

    if (!consultaEliminada) {
      res.status(404).json({ message: "Consulta no encontrada" });
      return;
    }

    res.status(200).json({ message: "Consulta eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la consulta", error });
  }
};

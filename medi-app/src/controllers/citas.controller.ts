import { Request, Response } from "express";
import Cita, { ICita } from "../models/cita.model";
import { sendEmail } from "../services/email.service";
import moment from "moment";
import dotenv from "dotenv";

dotenv.config();

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

    // Enviar correo electrónico de notificación
    const subject = "Cita en MediApp";
    const text = `Se ha creado una nueva cita con la siguiente información:\n\nTítulo: ${titulo}\nDescripción: ${descripcion}\nFecha y Hora: ${fechaHora}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h1 style="color: #4CAF50; text-align: center;">Nueva Cita Creada</h1>
        <p style="font-size: 16px; color: #333;">Se ha creado una nueva cita con la siguiente información:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Título:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${titulo}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Descripción:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${descripcion}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Fecha y Hora:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">${moment(fechaHora).format('YYYY-MM-DD hh:mm A')}</td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">Gracias por usar nuestro servicio.</p>
      </div>
    `;
    const emailUser = process.env.EMAIL_APPOINTMENT;
    if (!emailUser) {
      throw new Error("EMAIL_APPOINTMENT no está definido en las variables de entorno");
    }

    await sendEmail(emailUser, subject, text, html);

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

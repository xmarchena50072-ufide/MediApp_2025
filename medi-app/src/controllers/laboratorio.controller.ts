import { Request, Response } from 'express';
import Laboratorio from '../models/laboratorio.model';

export const createLaboratorio = async (req: Request, res: Response): Promise<void> => {
  const { paciente } = req.body;
  const archivos = req.files ? (req.files as Express.Multer.File[]).map((file) => file.filename) : [];

  try {
    const newLaboratorio = new Laboratorio({ paciente, archivos });
    await newLaboratorio.save();
    res.status(201).json(newLaboratorio);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el laboratorio' });
  }
};

export const getLaboratorios = async (req: Request, res: Response): Promise<void> => {
  try {
    const laboratorios = await Laboratorio.find().populate('paciente');
    res.status(200).json(laboratorios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener laboratorios' });
  }
};

export const deleteLaboratorio = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await Laboratorio.findByIdAndDelete(id);
    res.status(200).json({ message: 'Laboratorio eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el laboratorio' });
  }
};
import { Request, Response } from "express";
import MedicalForm, { IMedicalForm } from "../models/medicalForm.model";

// Crear un nuevo formulario médico
export const createMedicalForm = async (req: Request, res: Response) => {
  try {
    const newForm: IMedicalForm = new MedicalForm(req.body);
    await newForm.save();
    res.status(201).json({ message: "Formulario creado exitosamente", data: newForm });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el formulario", error });
  }
};

// Obtener todos los formularios médicos
export const getMedicalForms = async (req: Request, res: Response) => {
  try {
    const forms = await MedicalForm.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener formularios", error });
  }
};

// Obtener un formulario médico por ID
export const getMedicalFormById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const form = await MedicalForm.findById(id);

    if (!form) {
      res.status(404).json({ message: "Formulario no encontrado" });
      return;
    }

    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el formulario", error });
  }
};

// Actualizar un formulario médico
export const updateMedicalForm = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedForm = await MedicalForm.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedForm) {
        res.status(404).json({ message: "Formulario no encontrado" });
        return;
      }
  
      res.status(200).json({
        message: "Formulario actualizado exitosamente",
        data: updatedForm,
      });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el formulario", error });
    }
  };
  

// Eliminar un formulario médico
export const deleteMedicalForm = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedForm = await MedicalForm.findByIdAndDelete(id);
  
      if (!deletedForm) {
        res.status(404).json({ message: "Formulario no encontrado" });
        return;
      }
  
      res.status(200).json({ message: "Formulario eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el formulario", error });
    }
  };
  

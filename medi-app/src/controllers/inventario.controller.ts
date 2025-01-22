import { Request, Response } from 'express';
import Inventario, { IInventario } from '../models/inventario.model';

export const createInventory = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, descripcion, cantidad } = req.body;
      const nuevoInventario = new Inventario({ nombre, descripcion, cantidad });
      await nuevoInventario.save();
      res.status(201).json(nuevoInventario);
    } catch (error) {
      res.status(500).json({ message: 'Error al crear el inventario', error });
    }
  };
  

export const getInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const inventario = await Inventario.find();
    res.status(200).json(inventario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los Inventario', error });
  }
};

export const updateInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { cantidad } = req.body;
    const InventarioActualizado = await Inventario.findByIdAndUpdate(id, { cantidad }, { new: true });
    if (!InventarioActualizado) {
      res.status(404).json({ message: 'Inventario no encontrado' });
      return;
    }
    res.status(200).json(InventarioActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el Inventario', error });
  }
};
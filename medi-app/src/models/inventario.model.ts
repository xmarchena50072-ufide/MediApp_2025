import mongoose, { Schema, Document } from 'mongoose';

export interface IInventario extends Document {
  nombre: string;
  descripcion: string;
  cantidad: number;
}

const InventarioSchema: Schema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    cantidad: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IInventario>('Inventario', InventarioSchema);
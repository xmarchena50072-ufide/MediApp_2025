import mongoose, { Schema, Document } from "mongoose";

export interface ICita extends Document {
  titulo: string;
  fechaHora: Date;
  descripcion: string;
}

const CitaSchema: Schema = new Schema(
  {
    titulo: { type: String, required: true },
    fechaHora: { type: Date, required: true },
    descripcion: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ICita>("Cita", CitaSchema);

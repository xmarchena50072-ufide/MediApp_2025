import mongoose, { Schema, Document } from "mongoose";

export interface ILaboratorio extends Document {
  paciente: string;
  archivos: string[];
  fecha: Date;
}

const LaboratorioSchema: Schema = new Schema(
  {
    paciente: { type: String, required: true },
    archivos: { type: [String], required: true },
    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ILaboratorio>("Laboratorio", LaboratorioSchema);
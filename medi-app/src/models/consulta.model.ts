import mongoose, { Schema, Document } from "mongoose";

export interface IConsulta extends Document {
  paciente: string;
  correo: string;
  cedula: string;
  doctor: string; // Siempre será "Marlon Jimenez"
  sistolica: number;
  diastolica: number;
  frecuenciaCardiaca: number;
  saturacionOxigeno: string;
  temperatura: string;
  motivo: string;
  fecha: Date;
}

const ConsultaSchema: Schema = new Schema(
  {
    paciente: { type: String, required: true },
    correo: { type: String, required: true },
    cedula: { type: String, required: true },
    doctor: { type: String, required: true, default: "Marlon Jimenez" },
    sistolica: { type: Number, required: true },
    diastolica: { type: Number, required: true },
    frecuenciaCardiaca: { type: Number, required: true },
    saturacionOxigeno: { type: String, required: true },
    temperatura: { type: String, required: true },
    motivo: { type: String, required: true },
    fecha: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IConsulta>("Consulta", ConsultaSchema);

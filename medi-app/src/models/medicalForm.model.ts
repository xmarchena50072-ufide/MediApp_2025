import { Schema, model, Document } from "mongoose";

// Interfaz para el formulario médico
export interface IMedicalForm extends Document {
  nombreCompleto: string;
  fechaNacimiento: string;
  cedula: string;
  correo: string;
  contactoEmergencia: string;
  sexo: string;
  patologias: string;
  alergias: string;
  cirugias: string;
  inmunizaciones: string;
  tabaco: string;
  alcohol: string;
  drogas: string;
  actividadFisica: string;
  observaciones: string;
}

// Esquema de Mongoose
const MedicalFormSchema = new Schema(
  {
    nombreCompleto: { type: String, required: true },
    fechaNacimiento: { type: String, required: true },
    cedula: { type: String, required: true },
    correo: { type: String, required: true },
    contactoEmergencia: { type: String, required: true },
    sexo: { type: String, required: true },
    patologias: { type: String },
    alergias: { type: String },
    cirugias: { type: String },
    inmunizaciones: { type: String },
    tabaco: { type: String },
    alcohol: { type: String },
    drogas: { type: String },
    actividadFisica: { type: String },
    observaciones: { type: String },
  },
  { timestamps: true }
);

export default model<IMedicalForm>("MedicalForm", MedicalFormSchema);

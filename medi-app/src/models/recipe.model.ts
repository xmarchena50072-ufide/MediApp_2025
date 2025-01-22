import mongoose, { Schema, Document } from "mongoose";

export interface IRecipe extends Document {
  paciente: string;
  fecha: Date;
  medicamentos: string;
  correo: string; // Correo del paciente
  cedula: string; // Cedula del paciente
}

const RecipeSchema: Schema = new Schema(
  {
    paciente: { type: String, required: true },
    fecha: { type: Date, required: true },
    medicamentos: { type: String, required: true },
    correo: { type: String, required: true },
    cedula: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IRecipe>("Recipe", RecipeSchema);

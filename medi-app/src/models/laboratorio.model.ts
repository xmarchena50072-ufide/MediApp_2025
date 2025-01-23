import mongoose, { Document, Schema } from 'mongoose';

export interface ILaboratorio extends Document {
  paciente: mongoose.Types.ObjectId;
  archivos: string[];
}

const LaboratorioSchema: Schema = new Schema({
  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paciente',
    required: true,
  },
  archivos: [
    {
      type: String,
      required: true,
    },
  ],
});

const Laboratorio = mongoose.model<ILaboratorio>('Laboratorio', LaboratorioSchema);

export default Laboratorio;
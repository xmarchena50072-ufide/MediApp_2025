import React, { useState, useEffect }from "react";

import {
  getMedicalForms,
  createMedicalForm,
  deleteMedicalForm,
  updateMedicalForm,
} from "../../api/medicalForm";
import toast, { Toaster } from "react-hot-toast";

export default function CardMedicalForm() {
  const [form, setForm] = useState({
    nombreCompleto: "",
    fechaNacimiento: "",
    cedula: "",
    correo: "",
    contactoEmergencia: "",
    sexo: "",
    patologias: "",
    alergias: "",
    cirugias: "",
    inmunizaciones: "",
    tabaco: "",
    alcohol: "",
    drogas: "",
    actividadFisica: "",
    observaciones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const [formsList, setFormsList] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const data = await getMedicalForms();
      setFormsList(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      await createMedicalForm(form);
      toast.success("Formulario creado exitosamente");
      fetchForms();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      {/* Header */}
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <h6 className="text-blueGray-700 text-xl font-bold">Ficha Médica</h6>
      </div>

      {/* Body */}
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        {/* Ficha Básica */}
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Ficha Básica
        </h6>
        <div className="flex flex-wrap">
          <InputField
            label="Nombre Completo"
            name="nombreCompleto"
            value={form.nombreCompleto}
            onChange={handleChange}
          />
          <InputField
            label="Fecha de Nacimiento"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            type="date"
          />
          <InputField
            label="Cédula"
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
          />
          <InputField
            label="Correo Electrónico"
            name="correo"
            value={form.correo}
            onChange={handleChange}
          />
          <InputField
            label="Contacto de Emergencia"
            name="contactoEmergencia"
            value={form.contactoEmergencia}
            onChange={handleChange}
          />
          <InputField
            label="Sexo"
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
          />
        </div>

        {/* Antecedentes */}
        <h6 className="text-blueGray-400 text-sm mt-6 mb-6 font-bold uppercase">
          Antecedentes
        </h6>
        <div className="flex flex-wrap">
          <InputField
            label="Patologías"
            name="patologias"
            value={form.patologias}
            onChange={handleChange}
          />
          <InputField
            label="Alergias"
            name="alergias"
            value={form.alergias}
            onChange={handleChange}
          />
          <InputField
            label="Cirugías y/o Hospitalizaciones"
            name="cirugias"
            value={form.cirugias}
            onChange={handleChange}
          />
          <InputField
            label="Inmunizaciones"
            name="inmunizaciones"
            value={form.inmunizaciones}
            onChange={handleChange}
          />
        </div>

        {/* Hábitos */}
        <h6 className="text-blueGray-400 text-sm mt-6 mb-6 font-bold uppercase">
          Hábitos
        </h6>
        <div className="flex flex-wrap">
          <InputField
            label="Tabaco"
            name="tabaco"
            value={form.tabaco}
            onChange={handleChange}
          />
          <InputField
            label="Alcohol"
            name="alcohol"
            value={form.alcohol}
            onChange={handleChange}
          />
          <InputField
            label="Drogas"
            name="drogas"
            value={form.drogas}
            onChange={handleChange}
          />
          <InputField
            label="Actividad Física"
            name="actividadFisica"
            value={form.actividadFisica}
            onChange={handleChange}
          />
        </div>

        {/* Observaciones */}
        <div className="mt-6">
          <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
            Observaciones Generales
          </label>
          <textarea
            name="observaciones"
            value={form.observaciones}
            onChange={handleChange}
            rows="4"
            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            placeholder="Escribe aquí las observaciones generales..."
          ></textarea>
        </div>

        {/* Guardar */}
        <div className="flex justify-end mt-6">
          <button onClick={handleSubmit}
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-6 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button"
          >
            Guardar Información
          </button>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div className="w-full lg:w-6/12 px-4 mb-3">
    <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    />
  </div>
);

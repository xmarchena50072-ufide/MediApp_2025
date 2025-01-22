import React, { useState, useEffect } from "react";
import { getMedicalForms, deleteMedicalForm } from "../../api/medicalForm";
import { getMedicalRecipes } from "../../api/recipes";
import { getConsultations } from "../../api/consultations";
import toast, { Toaster } from "react-hot-toast";
import DynamicTable from "../utils/DynamicTable";

export default function CardMedicalFormsTable() {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [consultations, setConsultations] = useState([]);

  const [filters, setFilters] = useState({
    nombre: "",
    cedula: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filteredForms = forms.filter((form) => {
    return (
      form.nombreCompleto.toLowerCase().includes(filters.nombre.toLowerCase()) &&
      form.cedula.includes(filters.cedula)
    );
  });

  const fetchMedicalForms = async () => {
    try {
      const data = await getMedicalForms();
      setForms(data);
    } catch (error) {
      toast.error("Error al obtener formularios médicos");
    }
  };

  const fetchRecipes = async (paciente) => {
    try {
      const data = await getMedicalRecipes();
      setRecipes(data.filter(recipe => recipe.correo === paciente.correo && recipe.cedula === paciente.cedula));
    } catch (error) {
      toast.error("Error al obtener recetas médicas");
    }
  };

  const fetchConsultations = async (paciente) => {
    try {
      const data = await getConsultations();
      setConsultations(data.filter(consultation => consultation.correo === paciente.correo && consultation.cedula === paciente.cedula));
    } catch (error) {
      toast.error("Error al obtener citas");
    }
  };

  const handleSelectForm = (form) => {
    setSelectedForm(form);
    fetchRecipes(form);
    fetchConsultations(form);
  };

  useEffect(() => {
    fetchMedicalForms();
  }, []);

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    const days = today.getDate() - birthDate.getDate();

    let ageYears = years;
    let ageMonths = months;
    let ageDays = days;

    if (days < 0) {
      ageMonths -= 1;
      ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    return `${ageYears} años, ${ageMonths} meses, ${ageDays} días`;
  };

  const recipeColumns = [
    { field: 'fecha', header: 'Fecha', body: (rowData) => rowData.fecha.slice(0, 10) },
    { field: 'medicamentos', header: 'Medicamentos' },
  ];

  const consultationColumns = [
    { field: 'fecha', header: 'Fecha', body: (rowData) => rowData.fecha.slice(0, 10) },
    { field: 'doctor', header: 'Doctor' },
    { field: 'motivo', header: 'Descripción' },
    { field: 'frecuenciaCardiaca', header: 'Frecuencia Cardiaca', body: (rowData) => `${rowData.frecuenciaCardiaca} lat/min` },
    { field: 'saturacionOxigeno', header: 'Saturación Oxígeno', body: (rowData) => `${rowData.saturacionOxigeno}%` },
    { field: 'temperatura', header: 'Temperatura', body: (rowData) => `${rowData.temperatura}°C` },
    { field: 'sistolica', header: 'Sistólica', body: (rowData) => `${rowData.sistolica} mmHg` },
    { field: 'diastolica', header: 'Diastólica', body: (rowData) => `${rowData.diastolica} mmHg` },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <h6 className="text-blueGray-700 text-xl font-bold">Formularios Médicos</h6>
      </div>
      <div className="flex mb-4 mt-2 justify-between px-4">
        <input
          type="text"
          name="nombre"
          placeholder="Buscar por nombre"
          value={filters.nombre}
          onChange={handleFilterChange}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150 mr-2"
        />
        <input
          type="text"
          name="cedula"
          placeholder="Buscar por cédula"
          value={filters.cedula}
          onChange={handleFilterChange}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        />
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <table className="w-full bg-white rounded shadow mt-5">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">Nombre Completo</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">Fecha de Nacimiento</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">Cédula</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-blueGray-600 uppercase border-b border-blueGray-200">Acción</th>
            </tr>
          </thead>
          <tbody>
            {filteredForms.map((form) => (
              <tr key={form._id} className="hover:bg-blueGray-100">
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">{form.nombreCompleto}</td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">{form.fechaNacimiento}</td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">{form.cedula}</td>
                <td className="px-6 py-4 border-b border-blueGray-200 text-sm">
                  <button
                    onClick={() => handleSelectForm(form)}
                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  >
                    Ver Expediente Médico de {form.nombreCompleto}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedForm && (
        <div className="bg-white p-6 mt-4 rounded shadow-lg px-6 py-6">
          <h6 className="text-blueGray-700 text-xl font-bold mb-4">Detalles del Formulario</h6>
          <ul className="text-sm text-blueGray-600">
            <li><strong>Nombre Completo:</strong> {selectedForm.nombreCompleto}</li>
            <li><strong>Fecha de Nacimiento:</strong> {selectedForm.fechaNacimiento}</li>
            <li><strong>Edad:</strong> {calculateAge(selectedForm.fechaNacimiento)}</li>
            <li><strong>Cédula:</strong> {selectedForm.cedula}</li>
            <li><strong>Correo Electrónico:</strong> {selectedForm.correo}</li>
            <li><strong>Contacto de Emergencia:</strong> {selectedForm.contactoEmergencia}</li>
            <li><strong>Sexo:</strong> {selectedForm.sexo}</li>
            <li><strong>Patologías:</strong> {selectedForm.patologias}</li>
            <li><strong>Alergias:</strong> {selectedForm.alergias}</li>
            <li><strong>Cirugías:</strong> {selectedForm.cirugias}</li>
            <li><strong>Inmunizaciones:</strong> {selectedForm.inmunizaciones}</li>
            <li><strong>Hábitos:</strong> Tabaco: {selectedForm.tabaco}, Alcohol: {selectedForm.alcohol}, Drogas: {selectedForm.drogas}, Actividad Física: {selectedForm.actividadFisica}</li>
            <li><strong>Observaciones:</strong> {selectedForm.observaciones}</li>
          </ul>

          <h6 className="text-blueGray-700 text-xl font-bold mt-6">Recetas Médicas</h6>
          <DynamicTable data={recipes} columns={recipeColumns} name={`RecetasMedicas, ${selectedForm.nombreCompleto}_${selectedForm.cedula}`} />

          <h6 className="text-blueGray-700 text-xl font-bold mt-6">Consultas registradas</h6>
          <DynamicTable data={consultations} columns={consultationColumns} name={`ConsultasRegistradas, ${selectedForm.nombreCompleto}_${selectedForm.cedula}`} />
        </div>
      )}
    </div>
  );
}
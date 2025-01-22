import React, { useState, useEffect } from "react";
import { createMedicalRecipe } from "../../api/recipes";
import toast, { Toaster } from "react-hot-toast";
import { set } from "react-hook-form";

// Función para obtener pacientes desde la base de datos
const fetchPatients = async () => {
  const response = await fetch("http://localhost:4000/api/medical-forms"); // Ajusta la URL según tu servidor
  if (!response.ok) throw new Error("Error al obtener pacientes");
  return response.json();
};

export default function CardMedicalRecipe() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [form, setForm] = useState({
    paciente: "",
    fecha: "",
    medicamentos: "",
    correo: "",
    cedula: "",
  });

  const [patients, setPatients] = useState([]); // Lista de pacientes

  // Cargar pacientes al montar el componente
  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        const patientOptions = data.map((patient) => ({
          id: patient._id,
          nombreCompleto: patient.nombreCompleto,
          correo: patient.correo,
          cedula: patient.cedula,
        }));
        setPatients(patientOptions);
      } catch (error) {
        toast.error("Error al cargar los pacientes");
      }
    };
    loadPatients();
  }, []);

  const handlePatientChange = (event) => {
    const patientId = event.target.value;
    if (patientId === '') {
      setSelectedPatient(null);
      setForm({
        ...form,
        paciente: "",
        correo: "",
        cedula: "",
      });
      return;
    }
    const patient = patients.find(p => p.cedula === patientId);
    setSelectedPatient(patient);
    setForm({
      ...form,
      paciente: patient ? patient.nombreCompleto : "",
      correo: patient ? patient.correo : "",
      cedula: patient ? patient.cedula : "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMedicalRecipe(form);
      toast.success("Receta médica creada exitosamente");

      // Reiniciar formulario
      setForm({
        paciente: "",
        fecha: "",
        medicamentos: "",
        correo: "",
        cedula: "",
        nombreCompleto: ""
      });
    } catch (error) {
      toast.error("Error al crear la receta médica");
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      {/* Toaster */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Encabezado */}
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Agregar Receta Médica</h6>
          <button
            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Formulario */}
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Información de la Receta
          </h6>
          <div className="flex flex-wrap">
            {/* Dropdown de Pacientes */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Nombre del Paciente
                </label>
                <select
                  name="paciente"
                  value={form.nombreCompleto}
                  onChange={handlePatientChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                >
                  <option value=''>Seleccione un paciente</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.cedula}>
                      {patient.nombreCompleto}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Fecha */}
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Fecha
                </label>
                <input
                  type="date"
                  name="fecha"
                  value={form.fecha}
                  onChange={handleChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
              </div>
            </div>

            {/* Correo del Paciente */}
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Correo del Paciente
                </label>
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  placeholder="Correo Electrónico"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  disabled
                />
              </div>
            {/* Cédula del Paciente */}
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Cédula del Paciente
                </label>
                <input
                  type="text"
                  name="cedula"
                  value={form.cedula}
                  onChange={handleChange}
                  placeholder="Cédula de paciente"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  disabled
                />
              </div>
            </div>
            
            {/* Medicamentos */}
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Medicamentos
                </label>
                <textarea
                  name="medicamentos"
                  value={form.medicamentos}
                  onChange={handleChange}
                  placeholder="Escriba los medicamentos y las indicaciones"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

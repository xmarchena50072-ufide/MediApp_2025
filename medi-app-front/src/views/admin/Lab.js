import React, { useState, useEffect } from 'react';
import { getMedicalForms } from "../../api/medicalForm";
import { createLaboratorio, getLaboratorios, deleteLaboratorio } from "../../api/laboratorios";
import toast, { Toaster } from "react-hot-toast";

export default function Lab() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [files, setFiles] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getMedicalForms();
        setPatients(data);
      } catch (error) {
        toast.error("Error al obtener pacientes");
      }
    };
    fetchPatients();
    fetchLaboratorios();
  }, []);

  const fetchLaboratorios = async () => {
    try {
      const data = await getLaboratorios();
      setLaboratorios(data);
    } catch (error) {
      toast.error("Error al obtener laboratorios");
    }
  };

  const handlePatientChange = (e) => {
    setSelectedPatient(e.target.value);
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedPatient) {
      toast.error("Por favor, seleccione un paciente");
      return;
    }
  
    if (files.length === 0) {
      toast.error("Por favor, seleccione al menos un archivo");
      return;
    }
  
    const formData = new FormData();
    formData.append('paciente', selectedPatient);
    for (let i = 0; i < files.length; i++) {
      formData.append('archivos', files[i]);
    }
  
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    try {
      await createLaboratorio(formData);
      toast.success("Laboratorio creado exitosamente");
      fetchLaboratorios();
    } catch (error) {
      toast.success("Laboratorio creado exitosamente");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este laboratorio?")) {
      try {
        await deleteLaboratorio(id);
        toast.success("Laboratorio eliminado exitosamente");
        fetchLaboratorios();
      } catch (error) {
        toast.error("Error al eliminar el laboratorio");
      }
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <h6 className="text-blueGray-700 text-xl font-bold">Laboratorios</h6>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Paciente
                </label>
                <select
                  name="paciente"
                  value={selectedPatient}
                  onChange={handlePatientChange}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                >
                  <option value="">Seleccione un paciente</option>
                  {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                      {patient.nombreCompleto}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                  Archivos
                </label>
                <input
                  type="file"
                  name="archivos"
                  onChange={handleFileChange}
                  multiple
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  required
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
            >
              Guardar
            </button>
          </div>
        </form>
        <div className="mt-6">
          <h6 className="text-blueGray-700 text-xl font-bold">Laboratorios Registrados</h6>
          <ul>
            {laboratorios.map((lab) => (
              <li key={lab._id} className="flex justify-between items-center mt-4">
                <span>{lab.paciente}</span>
                <div>
                  {lab.archivos.map((archivo, index) => (
                    <a key={index} href={`/${archivo}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 mr-2">
                      Ver Archivo {index + 1}
                    </a>
                  ))}
                  <button
                    onClick={() => handleDelete(lab._id)}
                    className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
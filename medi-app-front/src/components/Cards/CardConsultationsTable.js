import React, { useState, useEffect } from "react";
import { getConsultations, deleteConsultation } from "../../api/consultations";
import toast, { Toaster } from "react-hot-toast";
import DynamicTable from "../utils/DynamicTable";

export default function CardConsultationsTable() {
  const [consultations, setConsultations] = useState([]);

  // Función para obtener consultas desde la API
  const fetchConsultations = async () => {
    try {
      const data = await getConsultations();
      setConsultations(data);
    } catch (error) {
      toast.error("Error al obtener consultas");
    }
  };

  // Función para eliminar una consulta
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta consulta?")) {
      try {
        await deleteConsultation(id);
        setConsultations(consultations.filter((consultation) => consultation._id !== id));
        toast.success("Consulta eliminada exitosamente");
      } catch (error) {
        toast.error("Error al eliminar la consulta");
      }
    }
  };

  // Obtener consultas al montar el componente
  useEffect(() => {
    fetchConsultations();
  }, []);

  const columns = [
    { field: 'paciente', header: 'Paciente' },
    { field: 'doctor', header: 'Doctor' },
    { field: 'fecha', header: 'Fecha', body: (rowData) => rowData.fecha.slice(0, 10) },
    { field: 'motivo', header: 'Motivo' },
    { field: '', header: 'Acción', body: (rowData) => (
      <button onClick={() => handleDelete(rowData._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Cancelar
      </button>
    )}
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <div className="text-center flex justify-between">
          <h6 className="text-blueGray-700 text-xl font-bold">Consultas Registradas</h6>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <DynamicTable data={consultations} columns={columns} name="ConsultasRegistradas" />
      </div>
    </div>
  );
}
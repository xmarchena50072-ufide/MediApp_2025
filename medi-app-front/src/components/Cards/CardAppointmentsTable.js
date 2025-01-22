import React, { useState, useEffect } from "react";
import { getAppointments, deleteAppointment } from "../../api/appointments";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import DynamicTable from '../utils/DynamicTable';

export default function CardAppointmentsTable() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      toast.error("Error al obtener citas");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter((appointment) => appointment._id !== id));
    } catch (error) {
      toast.error("Error al eliminar la cita");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const columns = [
    { field: 'titulo', header: 'Título' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'fechaHora', header: 'Fecha', body: (rowData) => moment(rowData.fechaHora).format('YYYY-MM-DD') },
    { field: 'fechaHora', header: 'Hora', body: (rowData) => moment(rowData.fechaHora).format('hh:mm A') },
    { field: '', header: 'Acción', body: (rowData) => (
      <button onClick={() => handleDelete(rowData._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Cancelar
      </button>
    )}
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <h6 className="text-blueGray-700 text-xl font-bold">Citas Agendadas</h6>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <DynamicTable data={appointments} columns={columns} name={'CitasAgendadas'} />
      </div>
    </div>
  );
}
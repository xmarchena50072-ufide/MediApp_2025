import React from "react";

// components
import CardAppointment from "components/Cards/CardAppointment";
import CardAppointmentsTable from "components/Cards/CardAppointmentsTable";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap justify-center mt-4 space-y-6 lg:space-y-0 lg:space-x-6">
        {/* Formulario para agregar cita */}
        <div className="w-full lg:w-1/2">
          <CardAppointment />
        </div>

        {/* Tabla de citas agendadas */}
        <div className="w-full lg:w-1/2">
          <CardAppointmentsTable />
        </div>
      </div>
    </>
  );
}

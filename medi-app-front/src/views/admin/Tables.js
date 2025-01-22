import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import CardConsultationForm from "components/Cards/CardConsultationForm"
import CardConsultationsTable from "components/Cards/CardConsultationsTable";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardConsultationForm />
        </div>
        <div className="w-full mb-12 px-4">
          <CardConsultationsTable color="dark" />
        </div>
      </div>
    </>
  );
}

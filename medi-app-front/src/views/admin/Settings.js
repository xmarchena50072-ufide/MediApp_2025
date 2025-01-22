import React from "react";

// components

import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import MedicalFormCard from "components/Cards/MedicalFormCard";
import CardMedicalFormsTable from "components/Cards/CardMedicalFormsTable";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <MedicalFormCard />
        </div>
      </div>
    </>
  );
}

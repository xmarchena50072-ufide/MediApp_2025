import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart";
import CardMedicalRecipe from "components/Cards/CardMedicalRecipe";
import CardMedicalRecipesTable from "components/Cards/CardMedicalRecipesTable";

export default function Maps() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardMedicalRecipe />
          </div>
        </div>
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardMedicalRecipesTable />
          </div>
        </div>
      </div>
    </>
  );
}

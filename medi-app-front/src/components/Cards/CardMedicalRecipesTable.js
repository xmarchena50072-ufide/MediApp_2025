import React, { useState, useEffect } from "react";
import { getMedicalRecipes, deleteMedicalRecipe } from "../../api/recipes";
import toast, { Toaster } from "react-hot-toast";
import DynamicTable from "../utils/DynamicTable";

export default function CardMedicalRecipesTable() {
  const [recipes, setRecipes] = useState([]);

  // Función para obtener recetas desde la API
  const fetchRecipes = async () => {
    try {
      const data = await getMedicalRecipes();
      setRecipes(data);
    } catch (error) {
      toast.error("Error al obtener recetas médicas");
    }
  };

  // Función para eliminar una receta
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta receta?")) {
      try {
        await deleteMedicalRecipe(id);
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
        toast.success("Receta eliminada exitosamente");
      } catch (error) {
        toast.error("Error al eliminar la receta");
      }
    }
  };

  // Obtener recetas al montar el componente
  useEffect(() => {
    fetchRecipes();
  }, []);

  const columns = [
    { field: 'paciente', header: 'Paciente' },
    { field: 'fecha', header: 'Fecha', body: (rowData) => rowData.fecha.slice(0, 10) },
    { field: 'medicamentos', header: 'Medicamentos' },
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
          <h6 className="text-blueGray-700 text-xl font-bold">Recetas Médicas</h6>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <DynamicTable data={recipes} columns={columns} name="RecetasMedicas" />
      </div>
    </div>
  );
}
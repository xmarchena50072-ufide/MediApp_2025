const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

// Obtener todas las recetas
export const getMedicalRecipes = async () => {
  const response = await fetch(`${API_URL}/recetas`);
  if (!response.ok) throw new Error("Error al obtener las recetas médicas");
  return response.json();
};

// Crear una receta
export const createMedicalRecipe = async (recipe) => {
  const response = await fetch(`${API_URL}/recetas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipe),
  });
  if (!response.ok) throw new Error("Error al crear la receta médica");
  return response.json();
};

// Eliminar una receta
export const deleteMedicalRecipe = async (id) => {
  const response = await fetch(`${API_URL}/recetas/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Error al eliminar la receta médica");
  return response.json();
};

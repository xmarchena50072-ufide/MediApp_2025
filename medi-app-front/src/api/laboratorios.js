const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export const getLaboratorios = async () => {
  const response = await fetch(`${API_URL}/laboratorios`);
  if (!response.ok) throw new Error("Error al obtener los laboratorios");
  return response.json();
};

export const createLaboratorio = async (formData) => {
  const response = await fetch(`${API_URL}/laboratorios`, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("Error al crear el laboratorio");
  return response.json();
};

export const deleteLaboratorio = async (id) => {
  const response = await fetch(`${API_URL}/laboratorios/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el laboratorio");
  return response.json();
};
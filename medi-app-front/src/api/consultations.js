const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export const getConsultations = async () => {
  const response = await fetch(`${API_URL}/consultas`);
  if (!response.ok) throw new Error("Error al obtener las consultas");
  return response.json();
};

export const createConsultation = async (consultation) => {
  const response = await fetch(`${API_URL}/consultas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(consultation),
  });
  if (!response.ok) throw new Error("Error al crear la consulta");
  return response.json();
};

export const deleteConsultation = async (id) => {
  const response = await fetch(`${API_URL}/consultas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar la consulta");
  return response.json();
};

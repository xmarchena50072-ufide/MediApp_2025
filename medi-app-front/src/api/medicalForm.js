const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

// Obtener todos los formularios médicos
export const getMedicalForms = async () => {
  const response = await fetch(`${API_URL}/medical-forms`);
  if (!response.ok) throw new Error("Error al obtener los formularios médicos");
  return response.json();
};

// Crear un nuevo formulario médico
export const createMedicalForm = async (medicalForm) => {
  const response = await fetch(`${API_URL}/medical-forms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(medicalForm),
  });
  if (!response.ok) throw new Error("Error al crear el formulario médico");
  return response.json();
};

// Eliminar un formulario médico por ID
export const deleteMedicalForm = async (id) => {
  const response = await fetch(`${API_URL}/medical-forms/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar el formulario médico");
  return response.json();
};

// Actualizar un formulario médico por ID
export const updateMedicalForm = async (id, updatedForm) => {
  const response = await fetch(`${API_URL}/medical-forms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedForm),
  });
  if (!response.ok) throw new Error("Error al actualizar el formulario médico");
  return response.json();
};

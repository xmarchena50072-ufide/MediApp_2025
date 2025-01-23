const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

// Obtener todos los laboratorios
export const getLaboratorios = async () => {
  const response = await fetch(`${API_URL}/laboratorio`);
  if (!response.ok) throw new Error('Error al obtener los laboratorios');
  return response.json();
};

// Crear un laboratorio
export const createLaboratorio = async (formData) => {
  const response = await fetch(`${API_URL}/laboratorio`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) throw new Error('Error al crear el laboratorio');
  return response.json();
};

// Eliminar un laboratorio
export const deleteLaboratorio = async (id) => {
  const response = await fetch(`${API_URL}/laboratorio/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar el laboratorio');
  return response.json();
};
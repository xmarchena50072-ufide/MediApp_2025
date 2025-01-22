const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export const createInventory = async (data) => {
  const response = await fetch(`${API_URL}/inventario`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al crear el inventario');
  return response.json();
};

export const getInventory  = async () => {
  const response = await fetch(`${API_URL}/inventario`);
  if (!response.ok) throw new Error('Error al obtener los medicamentos');
  return response.json();
};

export const updateInventory = async (id, data) => {
  const response = await fetch(`${API_URL}/inventario/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Error al actualizar el medicamento');
  return response.json();
};
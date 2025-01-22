const API_URL = process.env.REACT_APP_API_URL;

export const getAppointments = async () => {
  const response = await fetch(`${API_URL}/citas`);
  if (!response.ok) throw new Error("Error al obtener las citas");
  return response.json();
};

export const createAppointment = async (appointment) => {
  const response = await fetch(`${API_URL}/citas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointment),
  });
  if (!response.ok) throw new Error("Error al crear la cita");
  return response.json();
};

export const deleteAppointment = async (id) => {
  const response = await fetch(`${API_URL}/citas/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar la cita");
  return response.json();
};

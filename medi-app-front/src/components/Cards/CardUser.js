import React, { useState, useEffect } from "react";
import { getUserInfo } from "../../api/authv2";
import { getMedicalForms } from "../../api/medicalForm";
import toast from "react-hot-toast";

export default function CardUser() {
    const [user, setUser] = useState(null);
    const [medicalForm, setMedicalForm] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userInfo = await getUserInfo();
          setUser(userInfo.user);
  
          const medicalForms = await getMedicalForms();
          const userMedicalForm = medicalForms.find(form => form.correo === userInfo.user.email);
          setMedicalForm(userMedicalForm);
        } catch (error) {
          toast.error("Error al cargar la información del usuario");
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserData();
    }, []);
  
    const calculateAge = (birthdate) => {
      const birthDate = new Date(birthdate);
      const today = new Date();
      const years = today.getFullYear() - birthDate.getFullYear();
      const months = today.getMonth() - birthDate.getMonth();
      const days = today.getDate() - birthDate.getDate();
  
      let ageYears = years;
      let ageMonths = months;
      let ageDays = days;
  
      if (days < 0) {
        ageMonths -= 1;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }
  
      if (months < 0) {
        ageYears -= 1;
        ageMonths += 12;
      }
  
      return `${ageYears} años, ${ageMonths} meses, ${ageDays} días`;
    };
  
    if (loading) {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
  
    return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <h2 className="text-2xl font-bold mb-4">Información del Usuario</h2>
        {user && (
          <ul className="text-sm text-blueGray-600">
            <li><strong>Nombre:</strong> {user.username}</li>
            <li><strong>Correo Electrónico:</strong> {user.email}</li>
            <li><strong>Fecha de Registro:</strong> {user.createdAt.slice(0, 10)}</li>
          </ul>
        )}
        {medicalForm && (
          <>
            <h2 className="text-2xl font-bold mt-6 mb-4">Ficha Médica</h2>
            <ul className="text-sm text-blueGray-600">
              <li><strong>Nombre Completo:</strong> {medicalForm.nombreCompleto}</li>
              <li><strong>Fecha de Nacimiento:</strong> {medicalForm.fechaNacimiento}</li>
              <li><strong>Edad:</strong> {calculateAge(medicalForm.fechaNacimiento)}</li>
              <li><strong>Cédula:</strong> {medicalForm.cedula}</li>
              <li><strong>Correo Electrónico:</strong> {medicalForm.correo}</li>
              <li><strong>Contacto de Emergencia:</strong> {medicalForm.contactoEmergencia}</li>
              <li><strong>Sexo:</strong> {medicalForm.sexo}</li>
              <li><strong>Patologías:</strong> {medicalForm.patologias}</li>
              <li><strong>Alergias:</strong> {medicalForm.alergias}</li>
              <li><strong>Cirugías:</strong> {medicalForm.cirugias}</li>
              <li><strong>Inmunizaciones:</strong> {medicalForm.inmunizaciones}</li>
              <li><strong>Hábitos:</strong> Tabaco: {medicalForm.tabaco}, Alcohol: {medicalForm.alcohol}, Drogas: {medicalForm.drogas}, Actividad Física: {medicalForm.actividadFisica}</li>
              <li><strong>Observaciones:</strong> {medicalForm.observaciones}</li>
            </ul>
          </>
        )}
      </div>
    </div>
    );
}

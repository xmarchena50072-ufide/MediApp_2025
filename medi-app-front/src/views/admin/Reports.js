import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { getAppointments } from '../../api/appointments';
import { getMedicalForms } from '../../api/medicalForm';
import toast, { Toaster } from 'react-hot-toast';

// Registrar los componentes de chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function Reports() {
  const [chartData, setChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      const data = await getAppointments();
      const monthlyData = getMonthlyData(data);
      setChartData({
        labels: Object.keys(monthlyData),
        datasets: [
          {
            label: 'Citas Agendadas',
            data: Object.values(monthlyData),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
            ],
          },
        ],
      });
    } catch (error) {
      toast.error('Error al obtener las citas');
    }
  };

  const fetchPatients = async () => {
    try {
      const data = await getMedicalForms();
      const ageData = getAgeData(data);
      setBarChartData({
        labels: Object.keys(ageData).map(age => `${age} años`),
        datasets: [
          {
            label: 'Pacientes por Edad',
            data: Object.values(ageData),
            backgroundColor: Object.keys(ageData).map(() => getRandomColor()),
          },
        ],
      });
    } catch (error) {
      toast.error('Error al obtener los pacientes');
    }
  };

  const getMonthlyData = (appointments) => {
    const monthlyData = {};
    appointments.forEach((appointment) => {
      const month = new Date(appointment.fechaHora).toLocaleString('es-ES', { month: 'long' });
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month]++;
    });
    return monthlyData;
  };

  const getAgeData = (patients) => {
    const ageData = {};
    const today = new Date();
    patients.forEach((patient) => {
      const birthDate = new Date(patient.fechaNacimiento);
      let ageYears = today.getFullYear() - birthDate.getFullYear();
      let ageMonths = today.getMonth() - birthDate.getMonth();
      let ageDays = today.getDate() - birthDate.getDate();

      if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      }

      if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
      }

      const age = ageYears + ageMonths / 12;
      const truncatedAge = Math.floor(age); // Redondear al número entero más bajo
      if (!ageData[truncatedAge]) {
        ageData[truncatedAge] = 0;
      }
      ageData[truncatedAge]++;
    });
    return ageData;
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return Number.isInteger(value) ? value : null;
          }
        }
      }
    }
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="rounded-t bg-white mb-0 px-6 py-6">
        <h6 className="text-blueGray-700 text-xl font-bold">Reportes</h6>
      </div>
      <div className="flex px-4 lg:px-10 py-10 pt-0">
        {chartData ? (
          <div style={{ width: '30%', height: '30%', margin: '0 auto' }}>
            <Pie data={chartData} />
          </div>
        ) : (
          <p className="p-5">Cargando datos...</p>
        )}
        {barChartData ? (
          <div style={{ width: '40%', height: '40%', margin: '0 auto', marginTop: '20px' }}>
            <Bar data={barChartData} options={barChartOptions}/>
          </div>
        ) : (
          <p className="p-5">Cargando datos...</p>
        )}
      </div>
    </div>
  );
}
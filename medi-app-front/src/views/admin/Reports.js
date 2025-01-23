import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { getAppointments } from '../../api/appointments';
import { getMedicalForms } from '../../api/medicalForm';
import { getInventory } from '../../api/inventory'; 
import toast, { Toaster } from 'react-hot-toast';

// Registrar los componentes de chart.js
ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function Reports() {
  const [chartData, setChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [inventoryChartData, setInventoryChartData] = useState(null); 

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
    fetchInventory(); 
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
              '#FF0042',
              '#2700FF',
              '#D500FF',
              '#FFCE56',
              '#00FFEC',
              '#FF5733',
              '#6F7496',
              '#ABABAB',
              '#00FFF0',
              '#901DA2',
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

  const fetchInventory = async () => {
    try {
      const data = await getInventory();
      setInventoryChartData({
        labels: data.map(item => item.nombre),
        datasets: [
          {
            label: 'Cantidad de Muestras',
            data: data.map(item => item.cantidad),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      toast.error('Error al obtener el inventario');
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
      const truncatedAge = Math.floor(age); 
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
        <h6 className="text-blueGray-700 text-xl font-bold">Reportes de gráficos</h6>
      </div>
      <div className="flex flex-col px-4 lg:px-10 py-10 pt-0 space-y-6">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">Reporte de Citas Agendadas por Mes</h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto mb-5">
              {chartData ? (
                <div style={{ width: '20%', height: '20%', margin: '0 auto' }}>
                  <Pie data={chartData} />
                </div>
              ) : (
                <p className="p-5">Cargando datos...</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">Reporte de Pacientes por Edad</h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto mb-5">
              {barChartData ? (
                <div style={{ width: '40%', height: '40%', margin: '0 auto' }}>
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
              ) : (
                <p className="p-5">Cargando datos...</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">Reporte de Inventario de Muestras por Cantidad</h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto mb-5">
              {inventoryChartData ? (
                <div style={{ width: '40%', height: '40%', margin: '0 auto' }}>
                  <Bar data={inventoryChartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Inventario de Medicamentos' } } }} />
                </div>
              ) : (
                <p className="p-5">Cargando datos...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAppointments } from '../../api/appointments';
import toast from 'react-hot-toast';

const localizer = momentLocalizer(moment);

export default function Calendar() {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchAppointments = async () => {
			try {
				const data = await getAppointments();
				const formattedEvents = data.map((appointment) => ({
					title: appointment.titulo,
					start: new Date(appointment.fechaHora),
					end: new Date(moment(appointment.fechaHora).add(1, 'hour')), // Assuming each appointment lasts 1 hour
					desc: appointment.descripcion,
				}));
				setEvents(formattedEvents);
			} catch (error) {
				toast.error('Error al obtener citas');
			}
		};

		fetchAppointments();
	}, []);

	return (
		<div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
			<div className="rounded-t bg-white mb-0 px-6 py-6">
				<div className="container mx-auto px-4 py-6">
				<h6 className="text-blueGray-700 text-xl font-bold mb-5">Calendario de Citas Agendadas</h6>
					<BigCalendar
						localizer={localizer}
						events={events}
						startAccessor="start"
						endAccessor="end"
						style={{ height: 550 }}
						messages={{
							next: 'Siguiente',
							previous: 'Anterior',
							today: 'Hoy',
							month: 'Mes',
							week: 'Semana',
							day: 'Día',
							agenda: 'Agenda',
							date: 'Fecha',
							time: 'Hora',
							event: 'Evento',
						}}
					/>
				</div>
			</div>
		</div>
	);
}

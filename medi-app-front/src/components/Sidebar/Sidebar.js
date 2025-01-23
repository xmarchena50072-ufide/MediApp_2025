/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NotificationDropdown from 'components/Dropdowns/NotificationDropdown.js';
import UserDropdown from 'components/Dropdowns/UserDropdown.js';
import { getUserInfo } from '../../api/authv2';

export default function Sidebar() {
	const [collapseShow, setCollapseShow] = React.useState('hidden');
	const location = useLocation();
	const [role, setRole] = useState('');
	const [loading, setLoading] = useState(true);

	const fetchUserInfo = async () => {
		try {
			const response = await getUserInfo();
			const userRole = response.user.role; // "admin" or "user"
			setRole(userRole);
		} catch (error) {
			console.error('Error fetching user info:', error);
		} finally {
			setLoading(false);
		}
	};
	fetchUserInfo();

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
			</div>
		);
	}

	return (
		<>
			<nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
				<div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
					{/* Toggler */}
					<button
						className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
						type="button"
						onClick={() => setCollapseShow('bg-white m-2 py-3 px-6')}
					>
						<i className="fas fa-bars"></i>
					</button>

					{/* User */}
					<ul className="md:hidden items-center flex flex-wrap list-none">
						<li className="inline-block relative">
							<NotificationDropdown />
						</li>
						<li className="inline-block relative">
							<UserDropdown />
						</li>
					</ul>
					{/* Collapse */}
					<div
						className={
							'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
							collapseShow
						}
					>
						{/* Collapse header */}
						<div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
							<div className="flex flex-wrap">
								<div className="w-6/12">
									<Link
										className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
										to="/"
									>
										Notus React
									</Link>
								</div>
								<div className="w-6/12 flex justify-end">
									<button
										type="button"
										className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
										onClick={() => setCollapseShow('hidden')}
									>
										<i className="fas fa-times"></i>
									</button>
								</div>
							</div>
						</div>
						{/* Form */}
						<form className="mt-6 mb-4 md:hidden">
							<div className="mb-3 pt-0">
								<input
									type="text"
									placeholder="Search"
									className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
								/>
							</div>
						</form>

						{/* Divider */}
						<hr className="my-4 md:min-w-full" />

						{/* Navigation */}

						<ul className="md:flex-col md:min-w-full flex flex-col list-none">
							{role === 'admin' ? (
								<>
									<li className="items-center">
										<Link
											className={
												'text-xs uppercase py-3 font-bold block ' +
												(location.pathname === '/admin/dashboard'
													? 'text-lightBlue-500 hover:text-lightBlue-600'
													: 'text-blueGray-700 hover:text-blueGray-500')
											}
											to="/admin/dashboard"
										>
											<i
												className={
													'fas fa-tv mr-2 text-sm ' +
													(location.pathname === '/admin/dashboard' ? 'opacity-75' : 'text-blueGray-300')
												}
											></i>{' '}
											Citas
										</Link>
									</li>

									<li className="items-center">
										<Link
											className={
												'text-xs uppercase py-3 font-bold block ' +
												(location.pathname === '/admin/settings'
													? 'text-lightBlue-500 hover:text-lightBlue-600'
													: 'text-blueGray-700 hover:text-blueGray-500')
											}
											to="/admin/settings"
										>
											<i
												className={
													'fas fa-hospital-user mr-2 text-sm ' +
													(location.pathname === '/admin/settings' ? 'opacity-75' : 'text-blueGray-300')
												}
											></i>{' '}
											Paciente
										</Link>
									</li>

									<li className="items-center">
										<Link
											className={
												'text-xs uppercase py-3 font-bold block ' +
												(location.pathname === '/admin/tables'
													? 'text-lightBlue-500 hover:text-lightBlue-600'
													: 'text-blueGray-700 hover:text-blueGray-500')
											}
											to="/admin/tables"
										>
											<i
												className={
													'fas fa-table mr-2 text-sm ' +
													(location.pathname === '/admin/tables' ? 'opacity-75' : 'text-blueGray-300')
												}
											></i>{' '}
											Consultas
										</Link>
									</li>

									<li className="items-center">
										<Link
											className={
												'text-xs uppercase py-3 font-bold block ' +
												(location.pathname === '/admin/maps'
													? 'text-lightBlue-500 hover:text-lightBlue-600'
													: 'text-blueGray-700 hover:text-blueGray-500')
											}
											to="/admin/maps"
										>
											<i
												className={
													'fas fa-pen mr-2 text-sm ' +
													(location.pathname === '/admin/maps' ? 'opacity-75' : 'text-blueGray-300')
												}
											></i>{' '}
											Recetas
										</Link>
									</li>

									<li className="items-center">
										<Link
											className={
												'text-xs uppercase py-3 font-bold block ' +
												(location.pathname === '/admin/medicalForms'
													? 'text-lightBlue-500 hover:text-lightBlue-600'
													: 'text-blueGray-700 hover:text-blueGray-500')
											}
											to="/admin/medicalForms"
										>
											<i
												className={
													'fas fa-notes-medical mr-2 text-sm ' +
													(location.pathname === '/admin/medicalForms' ? 'opacity-75' : 'text-blueGray-300')
												}
											></i>{' '}
											Formularios Médicos
										</Link>
									</li>

									<li className="items-center">
										<Link
											className={
												'text-xs uppercase py-3 font-bold block ' +
												(location.pathname === '/admin/inventory'
													? 'text-lightBlue-500 hover:text-lightBlue-600'
													: 'text-blueGray-700 hover:text-blueGray-500')
											}
											to="/admin/inventory"
										>
											<i
												className={
													'fas fa-box mr-2 text-sm ' +
													(location.pathname === '/admin/inventory' ? 'opacity-75' : 'text-blueGray-300')
												}
											></i>{' '}
											Inventario
										</Link>
									</li>


									<li className="items-center">
										<Link
											className={
												'text-xs uppercase py-3 font-bold block ' +
												(location.pathname === '/admin/calendar'
													? 'text-lightBlue-500 hover:text-lightBlue-600'
													: 'text-blueGray-700 hover:text-blueGray-500')
											}
											to="/admin/calendar"
										>
											<i
												className={
													'fas fa-calendar mr-2 text-sm ' +
													(location.pathname === '/admin/calendar' ? 'opacity-75' : 'text-blueGray-300')
												}
											></i>{' '}
											Calendario
										</Link>
									</li>


									<li className="items-center">
										<Link
											className={
												'text-xs uppercase py-3 font-bold block ' +
												(location.pathname === '/admin/reports'
													? 'text-lightBlue-500 hover:text-lightBlue-600'
													: 'text-blueGray-700 hover:text-blueGray-500')
											}
											to="/admin/reports"
										>
											<i
												className={
													'fas fa-chart-pie mr-2 text-sm ' +
													(location.pathname === '/admin/reports' ? 'opacity-75' : 'text-blueGray-300')
												}
											></i>{' '}
											Reportes
										</Link>
									</li>


									{/* <li className="items-center">
										<Link
											className={
												'text-xs uppercase py-3 font-bold block ' +
												(location.pathname === '/admin/lab'
													? 'text-lightBlue-500 hover:text-lightBlue-600'
													: 'text-blueGray-700 hover:text-blueGray-500')
											}
											to="/admin/lab"
										>
											<i
												className={
													'fas fa-flask mr-2 text-sm ' +
													(location.pathname === '/admin/lab' ? 'opacity-75' : 'text-blueGray-300')
												}
											></i>{' '}
											Laboratorios
										</Link>
									</li> */}

								</>
							) : (
								<>
									<li className="items-center">
										<Link
											className={
												'text-xs uppercase py-3 font-bold block ' +
												(location.pathname === '/user/profile'
													? 'text-lightBlue-500 hover:text-lightBlue-600'
													: 'text-blueGray-700 hover:text-blueGray-500')
											}
											to="/user/profile"
										>
											<i
												className={
													'fas fa-user mr-2 text-sm ' +
													(location.pathname === '/user/profile' ? 'opacity-75' : 'text-blueGray-300')
												}
											></i>{' '}
											Perfil
										</Link>
									</li>
								</>
							)}
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
}

import React from 'react';
import CardMedicalFormsTable from 'components/Cards/CardMedicalFormsTable';

export default function MedicalForms() {
	return (
		<>
			<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
				<CardMedicalFormsTable />
			</div>
		</>
	);
}

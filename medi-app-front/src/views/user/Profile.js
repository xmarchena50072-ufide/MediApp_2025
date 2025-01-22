import React from 'react';

// components
import CardAppointment from 'components/Cards/CardAppointment';
import UserProfile from 'components/Cards/CardUser';

export default function Profile() {
	return (
		<>
			<div className="flex flex-wrap justify-center mt-4 space-y-6 lg:space-y-0 lg:space-x-6">
				<div className="w-full lg:w-1/2">
  				<UserProfile />
					<CardAppointment />
				</div>
			</div>
		</>
	);
}

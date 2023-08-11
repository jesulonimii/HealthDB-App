import { callApi, GLOBAL } from "@utils";

const API_URL = GLOBAL.API_URL;
const API_KEY = GLOBAL.API_KEY;

export const BookAppointment = async (data, id) => {

	const config = {
		method: "post",
		url: `${API_URL}/appointments/create?user_id=${id.toLowerCase().trim()}`,
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
	};

	const appointmentInfo = await callApi(config);
	console.log(appointmentInfo);
	return !appointmentInfo.error ? appointmentInfo : { error: appointmentInfo.error };
};

export const DeleteAppointment = async (user_id, appointment_id) => {
	const config = {
		method: "delete",
		url: `${API_URL}/appointments/delete?user_id=${user_id.toLowerCase().trim()}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: API_KEY,
		},
		data: {
			appointment_id: appointment_id,
		},
	};

	const info = await callApi(config);
	return true;
};


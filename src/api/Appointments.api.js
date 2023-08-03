import { callApi, GLOBAL } from "@utils";

const API_URL = GLOBAL.API_URL;
const API_KEY = GLOBAL.API_KEY;

export const BookAppointment = async (data, id) => {

	const config = {
		method: "post",
		url: `${API_URL}/appointments/${id.replaceAll("/", "%2F").toLowerCase().trim()}`,
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
	};

	const appointmentInfo = await callApi(config);
	console.log(appointmentInfo);
	return !appointmentInfo.error ? appointmentInfo : { error: appointmentInfo.error };
};

export const DeleteAppointment = async (id) => {

	const config = {
		method: "delete",
		url: `${API_URL}/appointments/${id.toLowerCase().trim().replaceAll("/", "%2F")}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: API_KEY,
		},
	};

	const info = await callApi(config);
	return true;
};


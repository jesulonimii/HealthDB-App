import { callApi, GLOBAL } from "@utils";

const API_URL = GLOBAL.API_URL;
const API_KEY = GLOBAL.API_KEY;

export const BookAppointment = async (data, id) => {

	const config = {
		method: "patch",
		url: `${API_URL}/appointments/${encodeURIComponent(id.toLowerCase().trim())}`,
		data: data,
		headers: {
			"Content-Type": "application/json",
		},
	};

	const userInfo = await callApi(config);
	return !userInfo.error ? { error: false, data: userInfo } : { error: userInfo.error };
};

export const DeleteAppointment = async (id) => {

	const config = {
		method: "delete",
		url: `${API_URL}/appointments/${encodeURIComponent(id.toLowerCase().trim())}`,
		headers: {
			"Content-Type": "application/json",
			Authorization: API_KEY,
		},
	};

	const info = await callApi(config);
	return true;
};


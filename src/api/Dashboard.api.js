import { callApi, GLOBAL } from "@utils";

const API_URL = GLOBAL.API_URL;
const API_KEY = GLOBAL.API_KEY;

export const GetHealthCenterNews = async (id) => {
	const config = {
		method: "get",
		url: `${API_URL}/news`,
		headers: {
			"Content-Type": "application/json",
		},
	};

	return await callApi(config);
};

export const GetNotifications = async (user_id) => {
	const config = {
		method: "get",
		url: `${API_URL}/users/notifications?user_id=${user_id}`,
		headers: {
			"Content-Type": "application/json",
		},
	};

	return await callApi(config);
};

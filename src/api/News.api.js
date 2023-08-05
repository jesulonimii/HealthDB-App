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

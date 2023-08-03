export QUERY_KEYS from "./query-keys";
export OAU_DEPARTMENTS from "./oau-departments";
import axios from "axios";

export { toast } from "./CustomAlerts";

export const api_url = process.env.EXPO_PUBLIC_API_URL;

export const GLOBAL = {
	theme_color: "#1f8318",
	API_URL: process.env.EXPO_PUBLIC_API_URL,
	API_KEY: process.env.EXPO_PUBLIC_API_KEY,
	default_user: {
		id: "1234",
		username: "test",
		first_name: "Test User",
		last_name: "Test User Surname",
		profile_image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
		email: "",
	},
};

export const COLORS = {
	primary: "#010066",
	secondary: "#b4a22f",
	info: "#045da6",
	success: "#1f8318",
	danger: "#d32f2f",
	error: "#d32f2f",
	warning: "#ffa000",
};

export const HEX2RGBA = (hex, alpha = 1) => {
	if (hex.length < 6 || hex.length > 7) {
		return `rgba(1, 1, 1, ${alpha})`;
	} else {
		const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
		return `rgba(${r},${g},${b},${alpha})`;
	}
};

export const stringToBoolean = (stringValue) => {
	switch (stringValue?.toString().toLowerCase()?.trim()) {
		case "true":
		case "yes":
		case "1":
		case true:
			return true;

		case "false":
		case "no":
		case "0":
		case null:
		case false:
		case undefined:
			return false;

		default:
			return JSON.parse(stringValue);
	}
};


export const callApi = async (config) => {
	try {
		const { data } = await axios({ ...config, timeout: 20000 });
		console.log("axios-data@callApi: ", data);
		return data;
	} catch (error) {
		console.error(error);
		return error.response.data;
	}
};

export const errorTextFieldClass = "border border-red-500 bg-red-50";
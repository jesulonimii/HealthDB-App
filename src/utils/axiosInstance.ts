import axios from "axios";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
	//@ts-ignore
	(config) => {
		config.timeout = 20000;
		return config;
	},
	(error) => {
		// Handle request errors here
		return Promise.reject(error);
	},
);

// Response interceptor
axiosInstance.interceptors.response.use(
	(response) => {
		// Modify the response data here (e.g., parse, transform)

		//const { data } = response;

		return response;
	},
	(error) => {
		console.log(error);
		// return error if response exists
		if (error.response) return error?.response;

		return Promise.reject(error);
	},
);

export default axiosInstance;

import { callApi, GLOBAL } from "@utils";

const API_URL = GLOBAL.API_URL;
const API_KEY = GLOBAL.API_KEY;

export const GetUserInfo = async (id) => {

	const config = {
		method: "get",
		url: `${API_URL}/users?id=${encodeURI(id.trim())}`,
		headers: {
			"Content-Type": "application/json"
		},
	};

	return  await callApi(config);
};

export const Login = async (id, password) => {

	const payload = {
		user_id: id.toLowerCase().trim(),
		password: password.trim(),
	};

	console.log(payload);

	const config = {
		method: "post",
		url: `${API_URL}/auth/login`,
		data: payload,
		headers: {
			"Content-Type": "application/json"
		},
	};

	return await callApi(config)
};
export const Signup = async ({ password, first_name, last_name, matric_number }) => {
	const payload = {
		"first_name" : first_name.trim(),
		"last_name" : last_name.trim(),
		"matric_number" : matric_number.toLowerCase().trim(),
		"password": password.trim()
	};

	const config = {
		method: "post",
		url: `${API_URL}/auth/signup`,
		data: payload,
		headers: {
			"Content-Type": "application/json"
		},
	};

	return await callApi(config)
};

export const CompleteInfo = async (data) => {

	const {
		user_id : id, first_name, last_name, phone, level, department, faculty,
		date_of_birth, gender, address, email, additional_medical_info, allergies,
	} = data

    console.log("check null", data);

	const payload = {
		student: {
			level: level.trim(),
			department: department.trim(),
			faculty: faculty.trim(),
			matric_number: id.toLowerCase().trim(),
		},
		personal_info: {
			first_name: first_name.trim(),
			last_name: last_name.trim(),
			profile_image: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
			date_of_birth: String(date_of_birth).trim(),
			gender: gender.trim(),
		},
		contact_info: {
			address: address.trim(),
			phone: phone.trim(),
			email: email.trim(),
		},
		medical_history: {
			additional_medical_info: additional_medical_info ? additional_medical_info.trim() : null,
			allergies: allergies ? allergies.trim() : null,
			surgeries: null,
			last_visit: null,
		},
		completed_app_registration: true,
	};

	const config = {
		method: "patch",
		url: `${API_URL}/users/${id.toLowerCase().trim().replaceAll("/", "%2F")}`,
		data: payload,
		headers: {
			"Content-Type": "application/json",
			Authorization: API_KEY,
		},
	};

    console.log(config.url);

	return await callApi(config);
};



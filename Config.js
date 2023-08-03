import * as Updates from "expo-updates";

let Config = {
	apiUrl: "http://192.168.0.101:5000" || process.env.EXPO_PUBLIC_API_URL,
	apiKey: "12345" || process.env.EXPO_PUBLIC_API_KEY,
};

if (Updates.channel === "preview") {
	Config.apiUrl = "https://healthdb-backend.onrender.com";
} else if (Updates.channel === "production") {
	Config.apiUrl = "https://healthdb-backend.onrender.com";
}

export default Config;

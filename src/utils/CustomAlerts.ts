import { ALERT_TYPE, Toast } from "react-native-alert-notification";

type toastProps = {
	title?: string;
	message: string;
	duration?: number;
	type?: "success" | "danger" | "warning";
};

export const toast = ({ title, message, duration, type = "success" }: toastProps) => {
	Toast.show({
		type: ALERT_TYPE[type.toUpperCase() || "SUCCESS"],
		title: title || null, //"Toast",
		titleStyle: { fontFamily: "outfit" },
		textBody: message || "This is toast notification",
		autoClose: duration || 5000,
	});
};

export default { toast };

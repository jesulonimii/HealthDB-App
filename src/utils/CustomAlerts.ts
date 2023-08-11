import { ALERT_TYPE, Toast } from "react-native-alert-notification"

type toastProps = {
	title?: string
	message: string
	duration?: number
	type?: "success" | "danger" | "error" | "warning"
}

export const toast = ({ title, message, duration, type = "success" }: toastProps) => {

    if (type === "error") type = "danger"

	Toast.show({
		type: ALERT_TYPE[type.toUpperCase() || "SUCCESS"],
		title: title || null, //"Toast",
		titleStyle: { fontFamily: "outfit", fontSize: 15, fontWeight: "500" },
		textBody: message || "This is toast notification!",
		autoClose: duration || 5000,
	})
};

export default { toast };

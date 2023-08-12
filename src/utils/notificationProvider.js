import * as Device from "expo-device"
import * as Notifications from "expo-notifications"
import { Platform } from "react-native"

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
})


export const scheduleLocalNotification = async ({ title = null, message, date }) => {
	console.log("scheduleLocalNotification", title, message, date)

	let trigger_time = null

	if (date === "now") {
		trigger_time = 2
	} else {
		trigger_time = Math.abs(new Date() - date) / 1000
	}


	if (message && date) {
		Notifications.scheduleNotificationAsync({
			content: {
				title: title,
				body: message,
				data: { data: "goes here" },
			},
			trigger: {
				seconds: trigger_time,
			},
		}).then((r) => console.log(r))
	}
}

export async function registerForPushNotificationsAsync() {
	let token
	if (Device.isDevice) {
		const { status: existingStatus } = await Notifications.getPermissionsAsync()
		let finalStatus = existingStatus
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync()
			finalStatus = status
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!")
			return
		}
		token = (await Notifications.getExpoPushTokenAsync({ projectId: "887f3a90-4fc7-41a4-b3e9-234b2f940f43" })).data
		console.log("Refresh expo push token:", token)
	} else {
		alert("Must use physical device for Push Notifications")
	}

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		})
	}

	return token
}

export default {
	registerForPushNotificationsAsync,
	Notifications,
}

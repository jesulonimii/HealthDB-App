import { useEffect, useRef, useState } from "react"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { COLORS, GLOBAL, NotificationProvider } from "@utils"
import { UserContext } from "@context"
import { router, Slot } from "expo-router"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

import { Outfit_500Medium, Outfit_700Bold, useFonts } from "@expo-google-fonts/outfit"
import { AlertNotificationRoot } from "react-native-alert-notification"
import { IconlyProvider } from "@lnanhkhoa/react-native-iconly"
import { useLocalStorage } from "@hooks"
import { UpdateUserPushNotificationToken } from "@/src/api/Auth.api"

const queryClient = new QueryClient()

export default function Layout() {
	//=> states
	const [user, setUser] = useState(GLOBAL.default_user)
	const { saveToStorage, getFromStorage } = useLocalStorage()

	//=> hooks
	const [loaded] = useFonts({
		outfit: Outfit_500Medium,
		"outfit-bold": Outfit_700Bold,
	})

	//===================Push Notifications Setup====================================

	const [oldPushToken, setOldPushToken] = useState("")
	getFromStorage("push-notifications-token").then((r) => setOldPushToken(r))

	const [expoPushToken, setExpoPushToken] = useState(oldPushToken)
	const [notification, setNotification] = useState(false)
	const notificationListener = useRef()
	const responseListener = useRef()

	useEffect(() => {
		NotificationProvider?.registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

		notificationListener.current = NotificationProvider?.Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification)
			},
		)

		responseListener.current = NotificationProvider?.Notifications.addNotificationResponseReceivedListener(
			(response) => {
				const {
					notification: {
						request: {
							content: {
								data: { screen },
							},
						},
					},
				} = response

				// When the user taps on the notification, this line checks if they //are suppose to be taken to a particular screen
				if (screen) {
					router.push(screen)
				}
			},
		)

		return () => {
			NotificationProvider?.Notifications.removeNotificationSubscription(notificationListener.current)
			NotificationProvider?.Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, []) //

	useEffect(() => {
		if (user?.user_id && oldPushToken !== expoPushToken) {
			saveToStorage("push-notifications-token", expoPushToken).then((r) => console.log(r))

			UpdateUserPushNotificationToken(user.user_id, expoPushToken).then((r) => console.log(r))

			console.log("updating push token", oldPushToken)
		} else {
			console.log("Push notification token up-to-date. aborting upload")
		}
	}, [expoPushToken])

	//==================================================================================

	//if fonts fail to load
	if (!loaded) {
		return null
	}

	return (
		<QueryClientProvider client={queryClient}>
			<IconlyProvider set="light" size={"xlarge"} primaryColor={COLORS.primary} secondaryColor={COLORS.secondary}>
				<UserContext.Provider value={{ user, setUser }}>
					<BottomSheetModalProvider>
						<AlertNotificationRoot>
							<StatusBar barStyle="dark-content" hidden={false} translucent={false} />

							<SafeAreaView className="w-full h-full">
								<Slot />
							</SafeAreaView>
						</AlertNotificationRoot>
					</BottomSheetModalProvider>
				</UserContext.Provider>
			</IconlyProvider>
		</QueryClientProvider>
	)
}

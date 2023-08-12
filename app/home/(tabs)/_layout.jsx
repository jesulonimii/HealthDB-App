import { Tabs, useRouter } from "expo-router"
import * as Icons from "react-native-heroicons/outline"
import * as IconsFilled from "react-native-heroicons/solid"
import Header from "@components/layout/Header"
import React, { useContext } from "react"
import { UserContext } from "@context"
import { BackHandler, Text } from "react-native"
import { useCustomNavigation } from "@hooks"
import { COLORS } from "@utils"
import { Home, Notification } from "@lnanhkhoa/react-native-iconly"

export default function HomeLayout() {
	const { overrideBackClick } = useCustomNavigation()
	const { user } = useContext(UserContext)
	const { profile_image } = user?.personal_info || {}
	const router = useRouter()

	//set up bottom nav bar
	const activeIconStyle = {
		set: "bulk",
		primaryColor: COLORS.primary,
		secondaryColor: COLORS.secondary,
	}

	const bottomNav = [
		{
			link: "dashboard",
			title: null,
			icon: {
				default: <Home />,
				active: <Home {...activeIconStyle} />,
			},
		},
		{
			link: "news",
			title: "Health Center news",
			icon: {
				default: <Icons.MegaphoneIcon className="text-primary rotate-2" />,
				active: <IconsFilled.MegaphoneIcon className="text-primary rotate-2" />,
			},
		},
		{
			link: "notifications",
			title: "Notifications",
			icon: {
				default: <Notification />,
				active: <Notification {...activeIconStyle} />,
			},
		},
	]

	overrideBackClick(() => {
		BackHandler.exitApp()
	})

	return (
		<>
			<Tabs className="w-full">
				{bottomNav.map((item, index) => {
					return (
						<Tabs.Screen
							name={item.link}
							key={index}
							options={{
								tabBarIcon: ({ focused }) => {
									return focused ? item.icon.active : item.icon.default
								},
								header: (props) => (
									<Header
										title={item.title}
										start_image={profile_image || "-"}
										endIcon={
											<Text className="w-full border border-gray-200 p-.5 px-3 rounded-xl text-gray-400">
												v 1.0
											</Text>
										}
										/*endIconClick={() => router.push("/notifications")}*/
									/>
								),
								tabBarShowLabel: false,
								tabBarStyle: {
									height: 60,
									marginBottom: 0,
								},
							}}
						/>
					)
				})}
			</Tabs>
		</>
	)
}

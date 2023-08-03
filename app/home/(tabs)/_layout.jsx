import { Tabs, useRouter } from "expo-router";
import * as Icons from "react-native-heroicons/outline";
import Header from "@components/layout/Header";
import { useContext } from "react";
import { UserContext } from "@context";
import { BackHandler } from "react-native";
import { useCustomNavigation } from "@hooks";
import { COLORS } from "@utils";
import { Activity, Edit, Home } from "@lnanhkhoa/react-native-iconly";

export default function HomeLayout() {
	const { overrideBackClick } = useCustomNavigation();
	const { user } = useContext(UserContext);
	const { profile_image } = user?.personal_info || {};
	const router = useRouter();

	//set up bottom nav bar
	const activeIconStyle = {
		set: "bulk",
		primaryColor: COLORS.primary,
		secondaryColor: COLORS.secondary,
	};

	const bottomNav = [
		{
			link: "dashboard",
			icon: {
				default: <Home />,
				active: <Home {...activeIconStyle} />,
			},
		},
		{
			link: "appointments",
			icon: {
				default: <Edit />,
				active: <Edit {...activeIconStyle} />,
			},
		},
		{
			link: "news",
			icon: {
				default: <Activity />,
				active: <Activity {...activeIconStyle} />,
			},
		},
	];

	overrideBackClick(() => {
		BackHandler.exitApp();
	});

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
									return focused ? item.icon.active : item.icon.default;
								},
								header: (props) => (
									<Header
										title={props.route.name === "appointments" ? props.route.name : null}
										start_image={profile_image || "-"}
										endIcon={<Icons.BellIcon className="w-full text-gray-500 mr-2" />}
										endIconClick={() => router.push("/notifications")}
									/>
								),
								tabBarShowLabel: false,
								tabBarStyle: {
									height: 60,
									marginBottom: 0,
								},
							}}
						/>
					);
				})}
			</Tabs>
		</>
	);
}

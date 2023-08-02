import { Tabs, useRouter } from "expo-router";
import * as Icons from "react-native-heroicons/outline";
import Header from "@components/layout/Header";
import { useContext } from "react";
import { UserContext } from "@context";
import { BackHandler } from "react-native";
import { useCustomNavigation } from "@hooks";
import { COLORS } from "@utils";

export default function HomeLayout() {
	const { overrideBackClick } = useCustomNavigation();
	const { user } = useContext(UserContext);
	const { profile_image } = user?.personal_info || {};
	const router = useRouter();

	//set up bottom nav bar
	const iconStyle = "text-gray-500 w-full";
	const bottomNav = [
		{
			link: "dashboard",
			icon: <Icons.HomeIcon className={iconStyle} />,
		},
		{
			link: "appointments",
			icon: <Icons.DocumentTextIcon className={iconStyle} />,
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
								tabBarIcon: () => item.icon,
								tabBarActiveTintColor: COLORS.success,
								tabBarActiveBackgroundColor: "#2021240f",
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

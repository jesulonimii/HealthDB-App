import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { COLORS, GLOBAL } from "@utils";
import { UserContext } from "@context";
import { Slot } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Outfit_500Medium, Outfit_700Bold, useFonts } from "@expo-google-fonts/outfit";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { IconlyProvider } from "@lnanhkhoa/react-native-iconly";

const queryClient = new QueryClient();

export default function Layout() {
	//=> states
	const [user, setUser] = useState(GLOBAL.default_user);

	//=> hooks
	const [loaded] = useFonts({
		outfit: Outfit_500Medium,
		"outfit-bold": Outfit_700Bold,
	});

	//if fonts fail to load
	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<IconlyProvider set="light" size={"xlarge"} primaryColor={COLORS.primary} secondaryColor={COLORS.secondary}>
				<UserContext.Provider value={{ user, setUser }}>
					<BottomSheetModalProvider>
						<AlertNotificationRoot>
							<StatusBar barStyle="dark-content" hidden={false} translucent={true} />

							<SafeAreaView className="w-full h-full">
								<Slot />
							</SafeAreaView>
						</AlertNotificationRoot>
					</BottomSheetModalProvider>
				</UserContext.Provider>
			</IconlyProvider>
		</QueryClientProvider>
	);
}

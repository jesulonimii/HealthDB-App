import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GLOBAL } from "@utils";
import { UserContext } from "@context";
import { Slot } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import { Outfit_500Medium, Outfit_700Bold, useFonts } from "@expo-google-fonts/outfit";

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
			<UserContext.Provider value={{ user, setUser }}>
				<BottomSheetModalProvider>
					<StatusBar barStyle="dark-content" hidden={false} translucent={true} />

					<SafeAreaView className="w-full h-full">
						<Slot />
					</SafeAreaView>
				</BottomSheetModalProvider>
			</UserContext.Provider>
		</QueryClientProvider>
	);
}

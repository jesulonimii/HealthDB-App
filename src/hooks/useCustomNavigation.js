import { useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { BackHandler } from "react-native";

const useCustomNavigation = () => {
	const router = useRouter();

	// Navigation
	const navigation = useNavigation();

	const overrideBackClick = (callback = () => {}) => {
		// Effect
		useEffect(() => {
			if (callback) {
				navigation.addListener("beforeRemove", (e) => {
					e.preventDefault();
					// overriding
					callback();
				});
			}
		}, []);
	};

	const exitApp = () => {
		BackHandler.exitApp();
	};

	return {
		overrideBackClick,
		exitApp,
	};
};

export default useCustomNavigation;

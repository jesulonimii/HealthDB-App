import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "@context";
import { useContext, useEffect } from "react";
import { Login as LoginUser } from "@api";
import { QUERY_KEYS } from "@utils";
import useLocalStorage from "./useLocalStorage";
import { useNavigation, useRouter } from "expo-router";
import { GetUserInfo } from "@/src/api/Auth.api";

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

	return {
		overrideBackClick,
	};
};

export default useCustomNavigation;

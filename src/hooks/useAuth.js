import { UserContext } from "@context";
import { useContext } from "react";
import { Login as LoginUser, Signup as SignupUser } from "@api";
import { QUERY_KEYS, toast } from "@utils";
import useLocalStorage from "./useLocalStorage";
import { useRouter } from "expo-router";
import { GetUserInfo } from "@/src/api/Auth.api";
import { Alert } from "react-native";

const useAuth = () => {
	const router = useRouter();

	const { user, setUser } = useContext(UserContext);
	const { saveToStorage, removeFromStorage } = useLocalStorage();

	const refreshUser = () => {
		return GetUserInfo(user.user_id)
			.then((user_response) => {
				if (!user_response.error) {
					setUser(user_response);
					return saveToStorage(QUERY_KEYS.user_data, user_response)
						.then((res) => {
							!user_response.completed_app_registration && router.push("/complete-registration");
							return true;
						})
						.catch((e) => console.log("error-saving-to-storage", e));
				} else {
					return {
						logged_in: false,
						error: user_response.error,
					};
				}
			})
			.catch((e) => {
				return {
					error: e,
				};
			});
	};

	const Login = async (id, password) => {
		return LoginUser(id, password).then((r) => {
			if (!r.error) {
				setUser(r);
				saveToStorage(QUERY_KEYS.user_data, r)
					.then((res) => {
						res.completed_app_registration ? router.push("/home") : router.push("/complete-registration");
					})
					.catch((e) => {
						alert("An error occurred while saving to storage");
						console.log("error-saving-to-storage", e);
					});
			} else {
				toast({ message: r.error?.split(":")[1], title: r.error?.split(":"[0]), type: "danger" });
			}
		});
	};

	const Signup = async (data) => {
		return SignupUser(data).then((r) => {
			if (!r.error) {
				setUser(r.data);
				saveToStorage(QUERY_KEYS.user_data, r.data).then((r) => {
					router.push("/complete-registration");
				});
			} else {
				toast({ message: r.error?.split(":")[1], title: r.error?.split(",")[0], type: "danger" });
			}
		});
	};

	const Logout = () => {
		Alert.alert("Logout", "Want to logout?", [
			{
				text: "No, Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{
				text: "Yes, Log me out.",
				onPress: () => {
					router.push("/login");
					setUser(null);
					toast({ message: "Logged out successfully" });
					removeFromStorage(QUERY_KEYS.user_data).then((r) => console.log(r));
				},
			},
		]);
	};

	return {
		Login,
		Logout,
		refreshUser,
		Signup,
		user,
		setUser,
	};
};

export default useAuth;

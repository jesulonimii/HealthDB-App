import { UserContext } from "@context";
import { useContext } from "react";
import { Login as LoginUser, Signup as SignupUser } from "@api";
import { QUERY_KEYS } from "@utils";
import useLocalStorage from "./useLocalStorage";
import { useRouter } from "expo-router";
import { GetUserInfo } from "@/src/api/Auth.api";

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
		return LoginUser(id, password)
			.then((r) => {
				if (!r.error) {
					setUser(r);
					saveToStorage(QUERY_KEYS.user_data, r)
						.then((res) => {

							res.completed_app_registration ? router.push("/home") : router.push("/complete-registration");

						})
						.catch((e) => {
							alert("An error occurred while saving to storage")
							console.log("error-saving-to-storage", e);
						});
				} else {
					alert(r.error);
				}
			});

	};

	const Signup = async (data) => {
		return SignupUser(data)
			.then((r) => {
				if (!r.error) {
					setUser(r.data);
					saveToStorage(QUERY_KEYS.user_data, r.data).then((r) => {
						router.push("/complete-registration");
					});
				} else {
					alert(r.error);
				}
			});

	};

	const Logout = () => {
		router.push("/login");
		setUser(null);
		removeFromStorage(QUERY_KEYS.user_data).then((r) => console.log(r));
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

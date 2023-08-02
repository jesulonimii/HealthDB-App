import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { QUERY_KEYS } from "@utils";
import { UserContext } from "@context";
import { getUserInfo } from "@api";
import { useLocalStorage } from "@hooks";

export default function App() {
	const { user, setUser } = useContext(UserContext);

	const { getFromStorage, removeFromStorage } = useLocalStorage();

	const router = useRouter();

	//removeFromStorage(QUERY_KEYS.user_data) //reset user data

	//fetch user data
	const matric_number = "csc/2019/108";
	const {
		data: userData,
		status,
		error,
		refetch: refetchUserData,
	} = useQuery({
		queryKey: [QUERY_KEYS.user_data, matric_number],
		enabled: false,
		queryFn: () => getUserInfo(matric_number),
		onSuccess: (data) => {
			setUser(data);
			console.log(data);
			router.push("/login");
		},
		onError: (error) => {
			//console.log(error);
		},
	});

	//check if user is logged in
	useEffect(() => {
		getFromStorage(QUERY_KEYS.user_data).then((data) => {

			console.log("user data", data);

			if (data) {
				setUser(data);
				data.completed_app_registration ? router.push("/home") : router.push("/complete-registration");
			} else {
				console.log("no user data, redirecting to login");
				router.push("/login");
			}
		});
	}, []);

	return null;
}

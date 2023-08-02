import { Text, View } from "react-native";
import { useContext, useEffect } from "react";
import { ScreenContext } from "@context";

function Appointments({}) {
	return (
		<View className={`flex-1 bg-gray-200`}>
			<View className="w-full h-[93%] justify-center items-center">
				<Text className="text-gray-500">No Appointments here - yet.</Text>
			</View>
		</View>
	);
}

export default Appointments;

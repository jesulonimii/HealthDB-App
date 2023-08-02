import { Text, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { ScreenContext } from "@context";
import { Body, Header } from "@components/layout";

function Notifications({}) {
	return (
		<View className={`flex-1`}>
			<Header title={"Notification"} backButton />

			<Body>
				<View className="w-full h-[80vh] items-center justify-center flex-1">
					<Text className="text-gray-500">No notifications here - yet.</Text>
				</View>
			</Body>
		</View>
	);
}

export default Notifications;

import { Text, View } from "react-native";
import React from "react";

function CardUi(props) {
	const { style = "", children = null, title } = props;

	return (
		<View className={`w-full bg-white h-fit rounded-lg border border-gray-100 p-5 ${style}`}>
			{title && <Text className="font-outfit text-gray-800 text-lg">{title}</Text>}
			{children}
		</View>
	);
}

export default CardUi;

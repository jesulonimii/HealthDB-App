import { Text, View } from "react-native";
import React from "react";

const News = ({}) => {
	return (
		<View className={`flex-1 bg-gray-200`}>
			<View className="w-full h-[93%] justify-center items-center">
				<Text className="text-gray-500">No news here - yet.</Text>
			</View>
		</View>
	);
};

export default News;

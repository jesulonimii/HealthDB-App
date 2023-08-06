import { Image, Text, View } from "react-native";
import React, { useState } from "react";
import { Body, Header } from "@components/layout";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@utils";
import { GetHealthCenterNews } from "@api";
import moment from "moment";

function NewsPage({}) {
	const { id } = useLocalSearchParams();

	const [newsData, setNewsData] = useState({});

	const {
		data,
		status,
		error,
		refetch: refetchNews,
	} = useQuery({
		queryKey: [QUERY_KEYS.health_center_news],
		queryFn: () => GetHealthCenterNews(),
		onSuccess: (data) => {
			const filteredData = data?.filter((item) => item?.title === id);
			setNewsData(filteredData[0]);
		},
	});

	console.log(newsData.image);

	return (
		<View className={`flex-1`}>
			<Header title={"News"} backButton />

			<Body>
				<View className="w-full justify-center h-fit">
					<Text className="font-outfit text-xl mt-6">{newsData?.title}</Text>
					<Text className="mt-2">{moment(newsData?.date).format("dddd Do MMM, YYYY [by] hh:mm a")}</Text>

					<Image source={{ uri: newsData?.image }} className="w-full h-[30vh] bg-gray-300 rounded-xl my-12" />

					<Text className="text-gray-500">{newsData?.content}</Text>
				</View>
			</Body>
		</View>
	);
}

export default NewsPage;

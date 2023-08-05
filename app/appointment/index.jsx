import { Pressable, Text, View } from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { COLORS, QUERY_KEYS } from "@utils";
import { GetHealthCenterNews } from "@api";
import { Body } from "@components/layout";
import { LoadingSpinner } from "@ui";
import { router } from "expo-router";

const Index = ({}) => {
	const [news, setNews] = useState([]);

	const {
		data: newsData,
		status,
		error,
		refetch: refetchNews,
	} = useQuery({
		queryKey: [QUERY_KEYS.health_center_news],
		queryFn: () => GetHealthCenterNews(),
		onSuccess: (data) => {
			setNews(data);
		},
	});

	return (
		<View className={`flex-1 bg-bg-50`}>
			{news && news.length > 0 ? (
				<Body onRefresh={refetchNews} className="w-full h-[93%] pb-16 justify-center items-center">
					<Text className="text-gray-500 text-xs text-center mb-4">Pull down to refresh</Text>
					{news.map((item, index) => (
						<AppointmentsItem key={index} news={item} />
					))}
				</Body>
			) : status === "loading" ? (
				<View className="w-full h-[93%] justify-center items-center">
					<LoadingSpinner size={24} style="my-4" color={COLORS.primary} />
					<Text className="text-gray-500">Loading Health Center News</Text>
				</View>
			) : (
				<View className="w-full h-[93%] justify-center items-center">
					<Text className="text-gray-500">No news here - yet.</Text>
				</View>
			)}
		</View>
	);
};

const AppointmentsItem = ({ news }) => {
	return (
		<Pressable onPress={() => router.push(`/news/${news.title}`)}>
			<View className="w-full h-fit min-h-[9vh] rounded-b-lg px-4 py-4">
				<Text className="font-outfit w-[90%] my-2">{news.title}</Text>
				<Text className="text-gray-500 text-sm">Released: {news.date}</Text>
			</View>
		</Pressable>
	);
};

export default Index;

import { Pressable, Text, View } from "react-native"
import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { COLORS, QUERY_KEYS } from "@utils"
import { GetHealthCenterNews } from "@api"
import { Body } from "@components/layout"
import { Card, CustomImage, LoadingSpinner } from "@ui"
import { router } from "expo-router"

const News = ({}) => {
	const [news, setNews] = useState([])

	const {
		data: newsData,
		status,
		error,
		refetch: refetchNews,
	} = useQuery({
		queryKey: [QUERY_KEYS.health_center_news],
		queryFn: () => GetHealthCenterNews(),
		onSuccess: (data) => {
			setNews(data)
		},
	})

	return (
		<View className={`flex-1 bg-bg-50`}>
			{news && news.length > 0 ? (
				<Body onRefresh={refetchNews} className="w-full h-[93%] pb-16 justify-center items-center">
					<Text className="text-gray-500 text-xs text-center mb-4">Pull down to refresh</Text>
					{news.map((item, index) => (
						<NewsItem key={index} news={item} />
					))}
					<Text className="text-gray-500 text-xs text-center my-4">-- End --</Text>
				</Body>
			) : status === "loading" ? (
				<Body onRefresh={refetchNews}>
					<View className="h-[80vh] w-full flex justify-center items-center">
						<LoadingSpinner size={32} style="my-4" color={COLORS.primary} />
						<Text className="text-gray-500 text-center">Loading Health Center News</Text>
					</View>
				</Body>
			) : (
				<Body onRefresh={refetchNews} className="w-full h-screen justify-center items-center">
					<View className="h-[80vh] w-full flex justify-center items-center">
						<Text className="text-gray-500">No news here - yet.</Text>
					</View>
				</Body>
			)}
		</View>
	)
}

const NewsItem = ({ news }) => {
	return (
		<Pressable onPress={() => router.push(`/news/${news.title}`)}>
			<Card className="w-full bg-white h-fit min-h-fit rounded-xl shadow-md my-3 flex items-center p-0 overflow-y-clip">
				<CustomImage src={news.image} className="w-full h-[21vh] bg-gray-300 rounded-t-xl" />

				<View className="w-full h-fit min-h-[9vh] rounded-b-lg px-4 py-4">
					<Text className="font-outfit w-[90%] my-2">{news.title}</Text>
					<Text className="text-gray-500 text-sm">Released: {news.date}</Text>
				</View>
			</Card>
		</Pressable>
	);
};

export default News;

import { Text, View } from "react-native";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@utils";
import { GetHealthCenterNews } from "@api";
import { Body } from "@components/layout";
import moment from "moment";

const Notification = ({}) => {
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
					{news.map((item, index) => (
						<NotificationItem key={index} notification={item} />
					))}
				</Body>
			) : (
				<View className="w-full h-[93%] justify-center items-center">
					<Text className="text-gray-500">No notifications here - yet.</Text>
				</View>
			)}
		</View>
	);
};

const NotificationItem = ({ notification }) => {
	return (
		<View className="w-full h-fit min-h-[9vh] border-b border-b-gray-200 px-4 py-4">
			<Text className="font-outfit w-[85%] my-2">{notification.title}</Text>
			<View className="flex flex-row justify-between">
				<Text className="text-gray-500 text-xs">{moment(notification.date).format("dddd Do MMM, YYYY")}</Text>
				<Text className="text-gray-500 text-xs">{moment(notification.date).format("HH:MM a")}</Text>
			</View>
		</View>
	);
};

export default Notification;

import { Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@utils"
import { Body } from "@components/layout"
import moment from "moment"
import { GetNotifications } from "@/src/api/Dashboard.api"
import { useAuth } from "@hooks"
import NotificationInformationBottomSheet from "@/app/home/modals/NotificationInformationBottomSheet"
import { openBottomSheet } from "@components/ui/BottomSheetWrapper"

const Notification = ({}) => {
	const [notifications, setNotifications] = useState([])
	const { user } = useAuth()

	const {
		data: notificationData,
		status,
		error,
		refetch: refetchNotifications,
	} = useQuery({
		queryKey: [QUERY_KEYS.user_notifications, user?.user_id],
		queryFn: () => GetNotifications(user?.user_id),
		onSuccess: (data) => {
			setNotifications(data)
		},
	})

	useEffect(() => {
		refetchNotifications()
	}, [])

	return (
		<View className={`flex-1 bg-bg-50`}>
			{notifications && notifications.length > 0 ? (
				<Body onRefresh={refetchNotifications} className="w-full h-[93%] pb-16 justify-center items-center">
					{notifications
						.sort((a, b) => new Date(b.date) - new Date(a.date))
						.map((item, index) => (
							<NotificationItem key={index} notification={item} />
						))}
				</Body>
			) : (
				<View className="w-full h-[93%] justify-center items-center">
					<Text className="text-gray-500">No notifications here - yet.</Text>
				</View>
			)}
		</View>
	)
}

const NotificationItem = ({ notification }) => {

	const notificationModalRef = useRef(null)
	

	return (
		<>
			<TouchableOpacity
				onPress={() => openBottomSheet(notificationModalRef)}
				className="w-full min-h-[9vh] mb-2 h-fit border-b border-b-gray-200 px-2 py-3 flex">
				<Text className="font-outfit w-[85%] h-fit mb-1">{notification.title}</Text>

				<Text numberOfLines={1} className="text-sm text-gray-500 text-ellipsis w-full">
					{notification.message.replace("\n", "")}
				</Text>

				<View className="flex flex-row justify-between mt-3 h-fit">
					<Text className="text-gray-400 text-xs">
						{moment(notification.date).format("dddd Do MMM, YYYY")}
					</Text>
					<Text className="text-gray-400 text-xs">{moment(notification.date).format("h:mm a")}</Text>
				</View>
			</TouchableOpacity>

			<NotificationInformationBottomSheet bottomSheetRef={notificationModalRef} notification={notification} />
		</>
	)
}

export default Notification

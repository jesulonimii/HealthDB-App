import React, { useState } from "react";
import { BackHandler, Linking, Platform, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { Card } from "@components/ui";
import { Body } from "@components/layout";
import * as Icons from "react-native-heroicons/outline";
import { useAuth } from "@hooks";
import { CustomButton } from "@ui";
import QRCodeBottomSheet from "../modals/QRCodeBottomSheet";
import BookAppointmentBottomSheet from "../modals/BookAppointmentBottomSheet";
import { useRouter } from "expo-router";
import useCustomNavigation from "@/src/hooks/useCustomNavigation";
import { DeleteAppointment } from "@api";

export default function Dashboard() {
	const { user, refreshUser } = useAuth();
	const { health_centre_registration, pending_appointment } = user || {};
	const { first_name, profile_image } = user?.personal_info || {};
	const [showAppointmentBS, setShowAppointmentBS] = useState(false);
	const [showQRCode, setShowQRCode] = useState(false);

	const home_actions = [
		{
			name: "Directions to Health Centre",
			action: OpenIntentToMap,
			icon: <Icons.MapPinIcon className="text-primary" />,
		},
		{
			name: "Schedule Appointment",
			action: () => setShowAppointmentBS(!showAppointmentBS),
			icon: <Icons.BuildingOfficeIcon className="text-primary" />,
		},
		{
			name: "Display Health Centre QR Code",
			action: () => setShowQRCode(!showQRCode),
			icon: <Icons.QrCodeIcon className="text-primary" />,
		},
	];

	const refreshUserDetails = async () => {
		return refreshUser();
	};

	const cancelAppointment = () => {
		DeleteAppointment(user?.id).then((r) => {
			return refreshUser();
		});
	};

	return (
		<View className="flex-1">
			<Body onRefresh={refreshUserDetails}>
				<Card style="my-2">
					<Text className="font-outfit text-gray-800 text-xl">
						{moment().format("HH") < 12
							? "Good morning "
							: moment().format("HH") < 16
							? "Good afternoon "
							: "Good evening "}
						<Text className="text-primary">{first_name}</Text>,
					</Text>

					<Text className="text-gray-400 mt-1">What do you want to do today?</Text>

					{/*<FormInput placeholder="Search for a product (ex: thrift, shoes, jeans)" />*/}

					<View className="flex flex-row w-full h-18 my-4 gap-x-2 items-start justify-between">
						{home_actions.map((item, index) => {
							return (
								<TouchableOpacity
									onPress={item.action}
									key={index}
									className="flex items-center justify-center flex-1">
									<View
										key={index}
										className={`my-2 rounded-full bg-[#302e2e1a] w-12 h-12 flex items-center justify-center`}>
										{item.icon}
									</View>
									<Text className="text-xs w-[80%] text-gray-400 mt-1 text-center">{item.name}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</Card>

				<Card style="my-2" title="Quick Info">
					<Text className="text-gray-500 mt-1">
						Health Centre id: <Text className="text-black font-medium">{user.user_id.toUpperCase()}</Text>
					</Text>

					<Text className="text-gray-500 mt-1">
						Last Health Centre Visit:{" "}
						<Text className="text-black font-medium">
							{user.medical_history.last_visit
								? moment(user.medical_history.last_visit).fromNow()
								: "None"}
						</Text>
					</Text>

					<View className="flex flex-row items-center gap-x-1">
						<Text className="text-gray-500 mt-1">Health Centre Registration Status:</Text>

						<View className="flex flex-row items-center h-full gap-x-1">
							{health_centre_registration?.status ? (
								<View className="w-2 aspect-square bg-success rounded-full"></View>
							) : (
								<View className="w-2 aspect-square bg-error rounded-full"></View>
							)}
							<Text className="text-black font-medium">
								{health_centre_registration?.status ? "Completed" : "Incomplete"}
							</Text>
						</View>
					</View>

					{!health_centre_registration?.status && (
						<Text className="text-gray-500 bg-red-100 rounded-lg p-2 text-center text-danger w-full mt-2">
							{health_centre_registration?.message}
						</Text>
					)}
				</Card>

				<Card style="my-2" title="Pending Appointment">
					{pending_appointment ? (
						<View className="flex">
							<Text className="text-gray-500 mt-1">
								Appointment id:{" "}
								<Text className="text-black font-medium">{pending_appointment?.id}</Text>
							</Text>

							<Text className="text-gray-500 mt-1">
								Date:{" "}
								<Text className="text-black font-medium">
									{moment(pending_appointment?.date_time).format("Do MMMM, yyyy")}
								</Text>
							</Text>

							<Text className="text-gray-500 mt-1">
								Time:{" "}
								<Text className="text-black font-medium">
									{moment(pending_appointment?.date_time).format("hh:mm A")}
								</Text>
							</Text>

							<View className="flex w-full">
								<CustomButton onClick={cancelAppointment} style="my-2 flex-1 bg-red-500">
									Cancel Appointment
								</CustomButton>
							</View>
						</View>
					) : (
						<View className="flex items-center">
							<Text className="text-gray-500 mt-3 ">You have no pending appointments.</Text>

							<CustomButton
								onClick={() => setShowAppointmentBS(true)}
								sx="mt-2"
								style="my-2 flex-1 bg-primary">
								Book Appointment
							</CustomButton>
						</View>
					)}
				</Card>
			</Body>

			<BookAppointmentBottomSheet setShow={setShowAppointmentBS} show={showAppointmentBS} />
			<QRCodeBottomSheet setShow={setShowQRCode} show={showQRCode} />
		</View>
	);
}

function OpenIntentToMap() {
	const lat = ""//"7.517977271192355";
	const lng = ""//"4.5262728938128625";
	const label = "OAU Health Centre";

	const scheme = Platform.select({ ios: "maps://0,0?q=", android: "geo:0,0?q=" });
	const latLng = `${lat},${lng}`;

	const url = Platform.select({
		ios: `${scheme}${label}@${latLng}`,
		android: `${scheme}${latLng}${label}`,
	});

	Linking.openURL(url).then((r) => {
		ToastAndroid.showWithGravityAndOffset("Opening Map...", ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
	});
}

import React, { useEffect, useState } from "react";
import { Linking, Platform, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import moment from "moment";
import { Card } from "@components/ui";
import { Body } from "@components/layout";
import { useAuth } from "@hooks";
import { CustomButton } from "@ui";
import QRCodeBottomSheet from "../modals/QRCodeBottomSheet";
import BookAppointmentBottomSheet from "../modals/BookAppointmentBottomSheet";
import { DeleteAppointment } from "@api";
import { COLORS, toast } from "@utils";
import IconStyled from "@components/ui/IconStyled";

export default function Dashboard() {
	const { user, refreshUser } = useAuth();
	const { health_centre_registration, pending_appointment } = user || {};
	const { first_name, profile_image } = user?.personal_info || {};
	const [showAppointmentBS, setShowAppointmentBS] = useState(false);
	const [showQRCode, setShowQRCode] = useState(false);
	const [health_centre_status, setHealthCentreStatus] = useState("pending");

	const home_actions = [
		{
			name: "Directions to Health Centre",
			action: OpenIntentToMap,
			icon: "Location",
		},
		{
			name: "Schedule Appointment",
			action: () => setShowAppointmentBS(!showAppointmentBS),
			icon: "Edit",
		},
		{
			name: "Display Health Centre QR Code",
			action: () => setShowQRCode(!showQRCode),
			icon: "QrCodeIcon",
		},
	];

	useEffect(() => {
		const { status } = health_centre_registration || {};

		if (status === "true" || status === true || status === "completed" || status === "complete") {
			setHealthCentreStatus("true");
		} else if (status === "pending") {
			setHealthCentreStatus("pending");
		} else if (status === "false" || status === false || status === "incomplete") {
			setHealthCentreStatus("false");
		}
	}, [user]);

	const refreshUserDetails = async () => {
		return refreshUser().then((r) => {
			r === true && toast({ message: "Refreshed user details", duration: 2000, type: "success" });
		});
	};

	const cancelAppointment = () => {
		DeleteAppointment(user?.user_id, pending_appointment?.appointment_id).then((r) => {
			toast({ message: "Appointment cancelled", duration: 2000 });
			return refreshUser();
		});
	};

	const healthCentreStatusStyle = {
		pending: {
			text: "Pending",
			color: "#9d7111",
			className: "bg-amber-50 text-amber-500",
			textClassName: "text-[#9d7111]",
			icon: "ExclamationCircleIcon",
		},
		true: {
			text: "No Issues",
			color: "#10b981",
			className: "bg-green-100 text-green-500",
			textClassName: "text-success",
			icon: "CheckBadgeIcon",
		},
		false: {
			text: "Incomplete",
			color: "#ef4444",
			className: "bg-red-100 text-red-500",
			textClassName: "text-danger",
			icon: "XCircleIcon",
		},
	};

	return (
		<View className="flex-1 ">
			<Body onRefresh={refreshUserDetails}>
				<Card className="py-8">
					<Text className="font-outfit text-gray-800 text-xl">
						{moment().format("HH") < 12
							? "Good morning "
							: moment().format("HH") < 16
							? "Good afternoon "
							: "Good evening "}
						<Text className="text-primary">{first_name}</Text>,
					</Text>

					<Text className="text-gray-400 mt-1">What do you want to do today?</Text>

					<View className="flex flex-row w-full h-18 my-4 gap-x-2 items-start justify-between">
						{home_actions.map((item, index) => {
							return (
								<TouchableOpacity
									onPress={item.action}
									key={index}
									className="flex items-center justify-center flex-1">
									<IconStyled color={COLORS.info} icon={item.icon} />
									<Text className="text-xs w-[80%] text-gray-400 mt-1 text-center">{item.name}</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				</Card>

				<Card icon={<IconStyled color={COLORS.error} icon={"Calendar"} />} title="Pending Appointment">
					{pending_appointment ? (
						<View className="flex">
							<Text className="text-gray-500 mt-1">
								Appointment id:{" "}
								<Text className="text-black font-medium">{pending_appointment?.appointment_id}</Text>
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

							<CustomButton onClick={cancelAppointment} className="bg-red-500">
								Cancel Appointment
							</CustomButton>
						</View>
					) : (
						<View className="flex">
							<Text className="text-gray-500 my-3 ">You have no pending appointments.</Text>

							{/*<CustomButton
								onClick={() => setShowAppointmentBS(true)}
								className="">
								Book Appointment
							</CustomButton>*/}
						</View>
					)}
				</Card>

				<Card icon={<IconStyled color={COLORS.primary} icon={"RocketLaunchIcon"} />} title="Quick Info">
					<Text className="text-gray-500 mt-1">
						Health Centre id: <Text className="text-black font-medium">{user?.user_id?.toUpperCase()}</Text>
					</Text>

					<Text className="text-gray-500 mt-1">
						Last Health Centre Visit:{" "}
						<Text className="text-black font-medium">
							{user?.medical_history?.last_visit
								? moment(user?.medical_history?.last_visit).fromNow()
								: "None"}
						</Text>
					</Text>

					<Text className="flex-1 text-gray-500 w-fit mt-1">Health Centre Status:</Text>

					{health_centre_status && (
						<View
							className={`rounded-lg p-2 w-full  flex flex-row items-center mt-4 ${healthCentreStatusStyle[health_centre_status].className}`}>
							<IconStyled
								icon={healthCentreStatusStyle[health_centre_status].icon}
								color={healthCentreStatusStyle[health_centre_status].color}
								sx={"w-4"}
							/>
							<Text
								className={`max-w-[80%] ml-3 ${healthCentreStatusStyle[health_centre_status].textClassName}`}>
								{health_centre_registration?.message}
							</Text>
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
	const lat = "";//"7.517977271192355";
	const lng = "";//"4.5262728938128625";
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

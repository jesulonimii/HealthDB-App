import React from "react";
import { Text, View } from "react-native";
import { GLOBAL } from "@utils";
import { Card } from "@components/ui";
import { Body, Header } from "@components/layout";
import { CustomButton, CustomImage } from "@ui";
import { useAuth } from "@hooks";
import moment from "moment/moment";

function ProfileScreen() {
	const { user, Logout } = useAuth();

	const { appointments } = user || {};
	const { hospitalizations } = user?.medical_history || {};
	const { phone, email, address } = user?.contact_info || {};
	const { matric_number, department, faculty, level } = user?.student || {};
	const { first_name, last_name, gender, date_of_birth, profile_image } = user?.personal_info || {};

	const stats = [
		{
			name: "Appointments made",
			value: appointments.length,
		},
		{
			name: "Hospitalizations",
			value: hospitalizations.length,
		},
	];

	return (
		<View className="flex-1">
			<Header title={"My Profile"} backButton />

			<Body style={"bg-gray-50"}>
				<Card style="my-2 items-center justify-center">

					<CustomImage defaultImage={GLOBAL.default_user.profile_image} source={profile_image}
								 style="rounded-full w-24 h-24 my-4" />

					<Text className="font-outfit text-xl">{`${first_name} ${last_name}`}</Text>

					<View className="flex flex-row gap-1 my-2">
						<Text>{matric_number}</Text>
						<Text className="text-primary">•</Text>
						<Text>{department}</Text>
						<Text className="text-primary">•</Text>
						<Text>{faculty}</Text>
					</View>

					<View className="flex flex-row w-full h-18 my-4 gap-x-2 items-start justify-between">
						{stats.map((item, index) => {
							return (
								<View key={index} className="flex items-center justify-center flex-1">
									<Text className="text-xl">{item.value}</Text>
									<Text className="text-xs w-[80%] text-gray-400 mt-1 text-center">{item.name}</Text>
								</View>
							);
						})}
					</View>
				</Card>

				<Card style="my-2" title="Health Center Info">
					<Text className="text-gray-500 mt-1">
						Health Centre id: <Text className="text-black font-medium">{user.user_id.toUpperCase()}</Text>
					</Text>

					<Text className="text-gray-500 mt-1">
						Last Visit:{" "}
						<Text className="text-black font-medium">
							{user.medical_history.last_visit
								? moment(user.medical_history.last_visit).fromNow()
								: "None"}
						</Text>
					</Text>
				</Card>

				<Card style="my-2" title="Contact info">
					<Text className="text-gray-500 mt-1">
						Phone Number: <Text className="text-black font-medium">{phone}</Text>
					</Text>

					<Text className="text-gray-500 mt-1">
						Email Address: <Text className="text-black font-medium">{email}</Text>
					</Text>

					<Text className="text-gray-500 mt-1">
						Residential Address: <Text className="text-black font-medium">{address}</Text>
					</Text>
				</Card>

				<Card style="my-2" title="Emergency Contacts">
					{user.emergency_contacts.map((item, index) => {
						return (
							<Text key={index} className="text-gray-500 mt-1">
								{item.name} - {item.relationship} -{" "}
								<Text className="text-black font-medium">{item.phone}</Text>
							</Text>
						);
					})}
				</Card>

				<CustomButton onClick={Logout}>Log Out</CustomButton>
			</Body>
		</View>
	);
}

export default ProfileScreen;

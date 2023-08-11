import { Text, View } from "react-native";
import { BottomSheetWrapper, CustomButton } from "@ui";
import PropTypes from "prop-types";
import moment from "moment/moment";
import IconStyled from "@components/ui/IconStyled";
import { COLORS } from "@utils";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";

const NotificationInformationBottomSheet = ({ notification }) => {
	const { dismissAll } = useBottomSheetModal();

	function closeSheet() {
		dismissAll();
	}

	return (
		<BottomSheetWrapper height="70%">
			<View className="flex-1 justify-evenly items-center h-full  px-8">
				<View className="flex flex-col items-center mt-8 w-full">
					<IconStyled
						color={COLORS.primary}
						sx={"w-fit h-fit p-12 text-xl rounded-full mb-8"}
						size={56}
						icon={"BellAlertIcon"}
					/>

					<Text className="mb- text-lg font-bold">{notification?.title}</Text>
					<Text className="text-gray-500">
						{moment(notification?.date).format("[On] dddd Do MMM, YYYY [by] h:mm a")}
					</Text>

					<Text className="my-12 w-full text-[16px] text-gray-700">{notification?.message}</Text>
				</View>

				<CustomButton sx="my-3 mb-6 absolute bottom-0" onClick={closeSheet}>
					Done
				</CustomButton>
			</View>
		</BottomSheetWrapper>
	);
};

NotificationInformationBottomSheet.propTypes = {
	notification: PropTypes.object.isRequired,
};

export default NotificationInformationBottomSheet;

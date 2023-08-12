import { Text, View } from "react-native"
import { BottomSheetWrapper, CustomButton } from "@ui"
import PropTypes from "prop-types"
import moment from "moment/moment"
import IconStyled from "@components/ui/IconStyled"
import { COLORS } from "@utils"
import { dismissBottomSheet } from "@components/ui/BottomSheetWrapper"
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"

const NotificationInformationBottomSheet = ({ bottomSheetRef, notification }) => {
	function closeSheet() {
		dismissBottomSheet(bottomSheetRef)
	}

	return (
		<BottomSheetWrapper height={70} sheetRef={bottomSheetRef}>
			<View className="h-[80%] flex justify-between">
				<View className="h-fit mb-3 flex flex-col items-center mt-8 w-full">
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
				</View>

				<View className="h-[80%] overflow-y-clip pt-4 pb-24">
					<BottomSheetScrollView>
						<Text className="w-full px-6 text-gray-700">{notification?.message}</Text>
					</BottomSheetScrollView>
				</View>

				<View className="h-fit px-4 items-center bg-white w-full">
					<CustomButton className="mb-8 absolute bottom-0" onClick={closeSheet}>
						Done
					</CustomButton>
				</View>
			</View>
		</BottomSheetWrapper>
	)
}

NotificationInformationBottomSheet.propTypes = {
	notification: PropTypes.object.isRequired,
};

export default NotificationInformationBottomSheet;

import { Text, View } from "react-native"
import { BottomSheetWrapper, CustomButton } from "@ui"
import QRCode from "react-native-qrcode-svg"
import { useAuth } from "@hooks"
import { dismissBottomSheet } from "@components/ui/BottomSheetWrapper"

const QrCodeBottomSheet = ({ bottomSheetRef }) => {
	const { user } = useAuth()

	return (
		<BottomSheetWrapper sheetRef={bottomSheetRef}>
			<View className="flex-1 justify-center items-center  px-8">
				<Text className="mb-1 text-lg font-bold"> Your Health Centre QR Code 🎉</Text>
				<Text className="mb-8 text-gray-500"> Ask the attendant to scan this code.</Text>

				<QRCode value={user?.id} size={200} />

				<CustomButton className="my-4" onClick={() => dismissBottomSheet(bottomSheetRef)}>
					Done
				</CustomButton>
			</View>
		</BottomSheetWrapper>
	)
}


export default QrCodeBottomSheet;

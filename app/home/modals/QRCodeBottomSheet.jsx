import { Text, View } from "react-native";
import { BottomSheetWrapper, CustomButton } from "@ui";
import QRCode from "react-native-qrcode-svg";
import PropTypes from "prop-types";
import { useAuth } from "@hooks";

const QrCodeBottomSheet = ({ show, setShow }) => {
	const { user } = useAuth();

	return (
		<BottomSheetWrapper setShow={setShow} show={show}>
			<View className="flex-1 justify-center items-center  px-8">
				<Text className="mb-1 text-lg font-bold"> Your Health Centre QR Code 🎉</Text>
				<Text className="mb-8 text-gray-500"> Ask the attendant to scan this code.</Text>

				<QRCode value={user?.id} size={200} />

				<CustomButton sx="my-3" onClick={() => setShow(false)}>
					Done
				</CustomButton>
			</View>
		</BottomSheetWrapper>
	);
};

QrCodeBottomSheet.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default QrCodeBottomSheet;

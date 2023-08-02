import { View, Text, ActivityIndicator } from "react-native";
import { Logo } from "@assets/icons";
import { COLORS } from "@utils";
import PropTypes from "prop-types";

const LoadingSpinner = ({ style = "", size = 56, color = "#000" }) => {
	return (
		<View className={`h-fit w-fit p-2 flex justify-center items-center ${style}`}>
			<ActivityIndicator size={size} color={color} />
			{/*<Logo className="w-4 h-4 absolute animate-pulse" />*/}
		</View>
	);
};

LoadingSpinner.propTypes = {
	style: PropTypes.string,
	size: PropTypes.number,
	color: PropTypes.string,
};

export default LoadingSpinner;
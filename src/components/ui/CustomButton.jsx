import { Button, Image, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import LoadingSpinner from "@components/ui/LoadingSpinner";

function CustomButton({
	style = "bg-primary my-3",
	sx = "",
	border = false,
	title = "",
	variant = "contained",
	disabled = false,
	onClick = () => {},
	endIcon = null,
	startIcon = null,
	loading = false,
	children,
}) {
	const variance = {
		contained: `${border && "border"} text-white `,
		outlined: "text-black border border-primary bg-transparent",
		text: "text-black bg-transparent",
	};

	const handleClick = (event) => {
		onClick && onClick(event);
	};

	const classes = twMerge(
		` bg-primary ${
			variance[variant]
		} w-full px-4 py-1 flex justify-center items-center rounded-[8px] my-3 ${style} ${disabled && "bg-gray-500"}`,
	);

	const classes2 = twMerge(`${variance[variant]} border-0 uppercase ${style}`);

	return (
		<View className={`w-full items-center justify-center my-2 ${sx}`}>
			<TouchableOpacity disabled={disabled} activeOpacity={0.8} onPress={handleClick} className={classes}>
				{!loading ? (
					<>
						{startIcon && startIcon}
						<Text className={twMerge(`my-3 ${classes2} bg-transparent text-center`)}>{children}</Text>
						{endIcon && endIcon}
					</>
				) : (
					<LoadingSpinner size={24} color={"#fff"} />
				)}
			</TouchableOpacity>
		</View>
	);
}

CustomButton.propTypes = {
    style: PropTypes.string,
    border: PropTypes.bool,
    title: PropTypes.string,
    variant: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    endIcon: PropTypes.element,
    startIcon: PropTypes.element,
    loading: PropTypes.bool,
    children: PropTypes.string,
}

export default CustomButton;

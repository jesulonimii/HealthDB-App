import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as Icons from "react-native-heroicons/outline";
import { useRouter } from "expo-router";
import PropTypes from "prop-types";
import OauLogo from "@assets/images/oau-logo.png";
import { CustomImage } from "@ui";
import { GLOBAL } from "@utils";

function Header({
	start_image = null,
	startLink = "/profile",
	title = null,
	endIcon = null,
	endIconClick,
	backButton,
}) {
	const router = useRouter();

	const handleNavigation = () => {
		if (backButton) {
			router.back();
		} else {
			router.push(startLink);
		}
	};

	return (
		<View className="w-full mt-8 drop-shadow flex-row bg-white border-b border-gray-100 py-2 px-2 h-14 items-center justify-between">
			<View className="w-[25%]">
				<TouchableOpacity className="w-8 h-8 p-0 flex" onPress={handleNavigation}>
					{start_image && (
						<CustomImage
							style="w-8 h-8 rounded-full"
							defaultImage={GLOBAL.default_user.profile_image}
							source={GLOBAL.default_user.profile_image}
						/>
					)}
					{backButton && <Icons.ChevronLeftIcon className="text-black w-10 h-10" />}
				</TouchableOpacity>
			</View>

			<View className="w-[50%] h-full capitalize flex justify-center items-center">
				{title && <Text className="capitalize h-full text-lg font-outfit w-full text-center">{title}</Text>}
				{!title && <Image className="w-8 h-8 rounded-full" source={OauLogo} />}
			</View>

			<View className="w-[25%] flex items-end">
				<TouchableOpacity className="w-fill p-0" onPress={endIconClick}>
					{endIcon && endIcon}
				</TouchableOpacity>
			</View>
		</View>
	);
}

Header.propTypes = {
	profile_image: PropTypes.string,
	title: PropTypes.string,
	endIcon: PropTypes.element,
	endIconClick: PropTypes.func,
};

export default Header;

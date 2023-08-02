import React, { useMemo } from "react";
import Animated, { interpolateColor, useAnimatedStyle } from "react-native-reanimated";

const CustomBottomSheetBackground = ({ style, animatedIndex }) => {
	//#region styles
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		// @ts-ignore
		backgroundColor: interpolateColor(animatedIndex.value, [0, 1], ["#a8b5eb", "#a8b5eb"]),
	}));
	const containerStyle = useMemo(() => [style, containerAnimatedStyle], [style, containerAnimatedStyle]);
	//#endregion

	// render
	return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default CustomBottomSheetBackground;

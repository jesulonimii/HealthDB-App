import React, { useMemo } from "react"
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated"

type BackdropProps = {
	animatedIndex?: Animated.SharedValue<number>
	style?: any
}

const CustomBottomSheetBackdrop = ({ animatedIndex, style }: BackdropProps) => {
	// animated variables
	const containerAnimatedStyle = useAnimatedStyle(() => ({
		opacity: interpolate(animatedIndex.value, [0.5, 1], [1, 1], Extrapolate.CLAMP),
	}))

	// styles
	const containerStyle = useMemo(
		() => [
			style,
			{
				backgroundColor: "rgba(0,0,0,0.75)",
			},
			containerAnimatedStyle,
		],
		[style, containerAnimatedStyle],
	)

	return <Animated.View style={containerStyle} />
}

export default CustomBottomSheetBackdrop;
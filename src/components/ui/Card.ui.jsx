import { Text, View } from "react-native"
import React from "react"
import { twMerge } from "tailwind-merge"
import { flattenObject, nativewindConvert } from "@utils"
import { styled } from "nativewind"

function CardUi({ style = "", className, children = null, title, icon, iconStyle = "" }) {
	const styles = {
		//@ts-ignore
		...nativewindConvert(`w-full bg-white h-fit rounded-xl border border-gray-100 p-5 my-2 overflow-clip`),
		...flattenObject(style),
	}

	return (
		<View style={styles}>
			<View className="flex flex-row items-center gap-4 mb-2">
				{icon && <View className={twMerge(`w-fit flex items-end ${iconStyle}`)}>{icon}</View>}
				{title && <Text className="font-outfit text-gray-800 text-lg">{title}</Text>}
			</View>
			{children}
		</View>
	)
}

export default styled(CardUi)

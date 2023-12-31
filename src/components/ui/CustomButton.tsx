import { twMerge } from "tailwind-merge"
import { Pressable, Text } from "react-native"
import LoadingSpinner from "@components/ui/LoadingSpinner"
import React from "react"
import { flattenObject, nativewindConvert } from "@utils"
import * as Icons from "react-native-heroicons/outline"
import { styled } from "nativewind"

type CustomButtonPropTypes = {
	variant?: "contained" | "outlined" | "text"
	disabled?: boolean
	onClick?: (event: any) => void
	endIcon?: any
	startIcon?: any
	loading?: boolean
	success?: boolean
	className?: string
	textClassName?: string
	children: React.ReactNode
	[x: string]: any
}

function CustomButton(props: CustomButtonPropTypes) {
	const {
		variant = "contained",
		disabled = false,
		style = {},
		onClick = () => {},
		endIcon = null,
		startIcon = null,
		loading = false,
		success = false,
		className,
		textClassName,
		children,
	} = props

	//console.log(style);

	const variance = {
		contained: `text-white `,
		outlined: "text-black border border-primary bg-transparent",
		text: "text-black bg-transparent",
	}

	const handleClick = (event: any) => {
		onClick && onClick(event)
	}

	const styles = {
		//@ts-ignore
		...nativewindConvert(`bg-primary w-full px-4 py-3.5 min-h-16 flex justify-center items-center rounded-xl my-3`),
		...flattenObject(style),
		//@ts-ignore
		...nativewindConvert(`${success && "bg-success"}`),
	}

	//console.log("button styles", styles);

	return (
		<Pressable style={styles} onPress={handleClick}>
			{success ? (
				<Icons.CheckIcon size={18} className={"text-white"} />
			) : loading ? (
				<LoadingSpinner size={18} color={"#fff"} />
			) : (
				<Text className={twMerge(`text-white uppercase ${textClassName}`)}>{children}</Text>
			)}
		</Pressable>
	)
}

export default styled(CustomButton)

import { BottomSheetModal } from "@gorhom/bottom-sheet"
import React, { useMemo } from "react"
import CustomBottomSheetBackdrop from "@components/ui/CustomBottomSheetBackdrop"

let ref = null

type BottomSheetWrapperTypes = {
	children: React.ReactNode
	sheetRef: any
	height?: number | [number, number]
}

const BottomSheetWrapper = ({ children, sheetRef, height = [50, 50] }: BottomSheetWrapperTypes) => {
	// ref
	//const bottomSheetRef = useRef(null);

	const parseHeights = () => {
		if (typeof height === "number") {
			return [`${height}%`]
		} else {
			return [`${height[0]}%`, `${height[1]}%`]
		}
	}

	// variables
	const snapPoints = useMemo(parseHeights, [])

	const close = () => sheetRef.current?.close()

	return (
		<BottomSheetModal
			ref={sheetRef}
			stackBehavior={"replace"}
			enableDismissOnClose={true}
			snapPoints={snapPoints}
			backdropComponent={(props) => <CustomBottomSheetBackdrop {...props} />}>
			{children}
		</BottomSheetModal>
	)
}


export const openBottomSheet = (ref) => {
	try {
		ref.current?.present()
	} catch (error) {
		console.log(error)
	}
}

export const dismissBottomSheet = (ref) => {
	try {
		ref.current?.dismiss()
	} catch (error) {
		console.log(error)
	}
}

export default BottomSheetWrapper;

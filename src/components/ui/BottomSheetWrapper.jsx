import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import CustomBottomSheetBackdrop from "@components/ui/CustomBottomSheetBackdrop";

let ref = null;

const BottomSheetWrapper = ({ children, show, setShow, height = "50%" }) => {
	// ref
	const bottomSheetRef = useRef(null);
	ref = bottomSheetRef;

	// variables
	const snapPoints = useMemo(() => [height], []);

	const close = () => bottomSheetRef.current?.close();

	const sheetState = () => {
		if (show) {
			bottomSheetRef.current?.present();
		} else {
			bottomSheetRef.current?.close();
		}
	};

	useEffect(() => sheetState, [show]);

	return (
		<BottomSheetModal
			ref={bottomSheetRef}
			stackBehavior={"replace"}
			enableDismissOnClose={true}
			onBackdropPress={() => setShow(false)}
			pressBehavior={"dismiss"}
			snapPoints={snapPoints}
			backdropComponent={(props) => <CustomBottomSheetBackdrop {...props} />}>
			{children}
		</BottomSheetModal>
	);
};


BottomSheetWrapper.propTypes = {
	children: PropTypes.any,
};


export const openBottomSheet = () => {
	try {
		ref.current?.present();
	} catch (error) {
		console.log(error);
	}
};

export const dismissBottomSheet = () => {
	try {
		ref.current?.dismiss();
	} catch (error) {
		console.log(error);
	}
};

export default BottomSheetWrapper;

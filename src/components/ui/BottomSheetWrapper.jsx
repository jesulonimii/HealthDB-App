import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import CustomBottomSheetBackdrop from "@components/ui/CustomBottomSheetBackdrop";

const BottomSheetWrapper = ({ children, show, setShow }) => {
	// ref
	const bottomSheetRef = useRef(null);

	// variables
	const snapPoints = useMemo(() => ["50%"], []);

	const sheetState = (show) => {
		if (show) {
			bottomSheetRef.current?.present();
		} else {
			bottomSheetRef.current?.close();
		}
	};

	useEffect(() => sheetState(show), [show]);

	return (
		<BottomSheetModal
			ref={bottomSheetRef}
			stackBehavior={"replace"}
			onBackdropPress={() => setShow(false)}
			pressBehavior={"close"}
			snapPoints={snapPoints}
			backdropComponent={(props) => <CustomBottomSheetBackdrop {...props} />}>
			{children}
		</BottomSheetModal>
	);
};

BottomSheetWrapper.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	children: PropTypes.any,
};

export default BottomSheetWrapper;

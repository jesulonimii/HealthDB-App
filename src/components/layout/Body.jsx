import { RefreshControl, ScrollView } from "react-native";
import { useCallback, useState } from "react";
import { COLORS } from "@utils";
import PropTypes from "prop-types";

function Body({ style = "", onRefresh = null, children }) {
	const [refreshing, setRefreshing] = useState(false);

	const startRefresh = useCallback(() => {
		if (onRefresh) {
			setRefreshing(true);

			onRefresh().then((r) => {
				setRefreshing(false);
			});
		}
	}, [onRefresh]);

	return (
		<ScrollView
			className={`p-4 w-full ${style}`}
			refreshControl={
				onRefresh ? (
					<RefreshControl colors={[COLORS.primary]} refreshing={refreshing} onRefresh={startRefresh} />
				) : null
			}>
			{children}
		</ScrollView>
	);
}

Body.propTypes = {
	style: PropTypes.string,
	onRefresh: PropTypes.func,
	children: PropTypes.any,
};

export default Body;

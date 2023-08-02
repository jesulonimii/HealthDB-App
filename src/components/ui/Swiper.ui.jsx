import { ScrollView, View } from "react-native";

function Swiper(props) {
    const { style = "", children } = props;

    onchange = (nativeEvent) => {};

    return (
        <View>
            <ScrollView
                className="h-12 w-full mt-4 pb-3"
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={({ nativeEvent }) => onchange}>
                {children}
            </ScrollView>

            <View></View>
        </View>
    );
}

export default Swiper;

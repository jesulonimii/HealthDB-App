import { object, oneOf, required, string } from "@types";
import { Picker } from "@react-native-picker/picker";
import { Text, View } from "react-native";
import { twMerge } from "tailwind-merge";

const DropDownPicker = (props) => {

	const {
		selected,
		setSelected,
		label,
		prompt = "Select an item",
		style = "",
		mode = "dropdown",
		items = [
			{
				label: "Item 1",
				value: "item1",
			},
			{
				label: "Item 2",
				value: "item2",
			},
		],
		onSelect = (itemValue) => {
		},
		currentItem = items[0],
		...rest
	} = props;


	return (
		<View className="flex gap-2 my-1">

			{label && <Text className="text-gray-500 capitalize">{label}</Text>}

			<View className={twMerge(`w-full ${style}`)}>
				<Picker
					selectedValue={selected}
					prompt={prompt}
					mode={mode}
					className={`w-full h-full ${style}`}
					onValueChange={(itemValue, itemIndex) => onSelect(itemValue)}
					{...rest}
				>
					{
						items.map((item, index) => <Picker.Item key={index} label={item.label} value={item.value} />)
					}
				</Picker>
			</View>

		</View>
	);
};


DropDownPicker.propTypes = {
	items: required.arrayOf({
		label: string,
		value: string,
	}),
	label: string,
	prompt: string,
	style: string,
	onSelect: required.functions,
	currentItem: object,
	selected: string,
	mode: oneOf(["dropdown", "dialog"]),
};

export default DropDownPicker;
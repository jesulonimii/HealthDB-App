import { TouchableOpacity } from "react-native";
import { FormInput } from "@components/ui/index";
import moment from "moment/moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { date, functions, number, oneOf, required, string } from "@types";

const DateSelector = (props) => {

	const {
		date, setDate, showPicker, setShowPicker, minDate, label,
		maxDate, mode = "date", onDateChange, validateDate,
		formatDateValue = "Do MMMM, [by] hh:mm A", placeholder = `Pick ${mode.toUpperCase()}`,
		displayType = "calendar", ...rest
	} = props;


	const onChange = (event, selectedDate) => {
		const dDate = selectedDate;

		setShowPicker(false);
		setDate(dDate);
		onDateChange && onDateChange(event, dDate);
		validateDate && validateDate(dDate);

	};


	return (
		<>
			<TouchableOpacity onPress={() => setShowPicker(true)}>
				<FormInput
					placeholder={placeholder}
					label={label && label}
					disabled
					value={moment(date).format(formatDateValue)}
				/>

				{showPicker && (
					<DateTimePicker
						value={date}
						display={displayType}
						mode={mode}
						maximumDate={maxDate && maxDate}
						minimumDate={minDate && minDate}
						minuteInterval={30}
						onChange={onDateChange ? onDateChange : onChange}
						{...rest}
					/>
				)}
			</TouchableOpacity>
		</>
	);
};


DateSelector.propTypes = {
	date: required.date,
	setDate: required.functions,
	showPicker: required.boolean,
	setShowPicker: required.functions,
	minDate: date,
	maxDate: date,
	mode: oneOf(["date", "time", "datetime", "countdown"]),
	onDateChange: functions,
	validateDate: functions,
	formatDateValue: string,
	placeholder: string,
	label: string,
	displayType: oneOf(["default", "spinner", "calendar", "clock"]),

};

export default DateSelector;
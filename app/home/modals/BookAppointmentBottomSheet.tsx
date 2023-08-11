import { Text, View } from "react-native"
import { BottomSheetWrapper, CustomButton } from "@ui"
import { BookAppointment } from "@api"
import { useAuth } from "@hooks"
import { useState } from "react"
import moment from "moment"
import DateSelector from "@components/ui/DateSelector"
import { toast } from "@utils"
import { dismissBottomSheet } from "@components/ui/BottomSheetWrapper"

const BookAppointmentBottomSheet = ({ bottomSheetRef }) => {
	const { user, refreshUser } = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [date, setDate] = useState(new Date(new Date().getTime() + 30 * 60000))
	const [showPicker, setShowPicker] = useState(false)
	const [mode, setMode] = useState("time")

	const onChange = (event, selectedDate) => {
		const dDate = selectedDate

		setShowPicker(false)
		checkDate(dDate)
	}

	const checkDate = (selectedDate) => {
		const _5pm = new Date().toJSON().substring(0, 11) + "17:30:00.00Z"
		const _8am = new Date().toJSON().substring(0, 11) + "08:00:00.00Z"
		const _6pm = new Date().toJSON().substring(0, 11) + "18:30:00.00Z"

		if (selectedDate.getTime() < new Date().getTime()) {
			setDate(new Date(new Date().getTime() + 30 * 60000))
		} else if (moment(selectedDate).isAfter(moment(_6pm))) {
			setDate(new Date(_5pm))
		} else if (moment(selectedDate).isBefore(moment(_8am))) {
			setDate(new Date(_5pm))
		} else {
			setDate(selectedDate)
		}
	}

	const submitBooking = () => {
		setIsLoading(true)
		const payload = {
			date_time: date,
			appointment_id: `${new Date().toJSON().substring(0, 10).replaceAll("-", "")}/${user.user_id
				.replaceAll("/", "")
				.toUpperCase()}`,
		}

		BookAppointment(payload, user?.user_id)
			.then((r) => {
				setIsLoading(false)
				dismissBottomSheet(bottomSheetRef)

				refreshUser().then((r) => {
					toast({ message: "Appointment Booked successfully!", type: "success" })
				})
			})
			.catch((e) => {
				alert(e.message)
				setIsLoading(false)
			})
	}

	return (
		<BottomSheetWrapper sheetRef={bottomSheetRef}>
			<View className="flex-1 justify-center items-center  px-8">
				<Text className="mb-1 text-lg font-bold"> Book Appointment at the health center</Text>
				<Text className="mb-4 text-gray-500"> Fill in the details to book an appointment today.</Text>

				<DateSelector
					date={date}
					mode={"time"}
					displayType={"spinner"}
					setDate={setDate}
					minDate={new Date()}
					minuteInterval={15}
					showPicker={showPicker}
					setShowPicker={setShowPicker}
				/>

				<CustomButton loading={isLoading} onClick={submitBooking}>
					Schedule Appointment
				</CustomButton>
			</View>
		</BottomSheetWrapper>
	)
}


export default BookAppointmentBottomSheet;
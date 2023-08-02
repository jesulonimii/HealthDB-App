import { Text, View } from "react-native";
import { CustomButton, FormInput } from "@ui";
import { CompleteInfo } from "@api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@context";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useAuth, useLocalStorage } from "@hooks";
import { QUERY_KEYS } from "@utils";
import { Body, Header } from "@components/layout";
import { Card } from "@components/ui";
import DateSelector from "@components/ui/DateSelector";

const CompleteRegistrationScreen = ({}) => {
	const { user, setUser } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(false);
	const { saveToStorage } = useLocalStorage();
	const { Logout } = useAuth();

	const [date, setDate] = useState(new Date(new Date().getTime()));
	const [showPicker, setShowPicker] = useState(false);

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		console.log("errors?", errors);
	}, [errors]);

	const router = useRouter();


	const onSubmit = (data) => {
		setIsLoading(true);
		console.log("Submitting: ", data);

		const patched_data = {
			...data,
			user_id: user.user_id,
			first_name: user.personal_info.first_name,
			last_name: user.personal_info.last_name,
			phone: "-",
		};


		CompleteInfo(patched_data)
			.then((r) => {
				setIsLoading(false);

				console.log(r);

				if (!r.error) {
					setUser(r.data);
					saveToStorage(QUERY_KEYS.user_data, r.data).then((r) => router.push("/home"));
				} else {
					alert(r.error);
				}
			});
	};

	useEffect(() => {
		errors.length > 0 && alert(JSON.stringify(errors));
	}, [errors]);

	return (
		<View className={`h-full flex items-center justify-center w-full bg-gray-50`}>
			<Header title="Complete registration" endIcon={<Text>Logout</Text>} endIconClick={Logout} />

			<Body style="py-8">
				<View className="w-full">
					<Text className="my-1"> Enter your details to finish your registration.</Text>
				</View>

				<Card style="my-1 mt-6">
					<Text className="my-1 text-lg font-outfit">Personal Information </Text>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Email Address"
								placeholder="johndoe@student.oauife.edu.eng"
								onBlur={onBlur}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="email"
						rules={{ required: true }}
					/>

					<DateSelector date={date}
								  mode={'date'}
								  label={'Date of Birth'}
								  minDate={new Date(1990, 0, 1)}
								  maxDate={new Date()}
								  setDate={setDate}
								  showPicker={showPicker}
								  setShowPicker={setShowPicker} />

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Residential Address"
								placeholder="ex: Block K101, Angola Hall, OAU."
								onBlur={onBlur}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="address"
						rules={{ required: true }}
					/>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Gender"
								placeholder="ex: Male, Female"
								onBlur={onBlur}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="gender"
						rules={{ required: true }}
					/>
				</Card>

				<Card style="my-1">
					<Text className="my-1 text-lg font-outfit">Student Information </Text>
					<Text className="my-1 text-gray-400">
						*To be filled only by students of Obafemi Awolowo University.
					</Text>

					{/*<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Matric Number"
								placeholder="ex: CSC/2023/001"
								onBlur={onBlur}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="matric_number"
						rules={{ required: false }}
					/>*/}

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Faculty"
								placeholder="ex: Technology"
								onBlur={onBlur}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="faculty"
						rules={{ required: false }}
					/>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Department"
								placeholder="ex: Computer Science and Engineering"
								onBlur={onBlur}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="department"
						rules={{ required: false }}
					/>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Level"
								placeholder="ex: 300"
								onBlur={onBlur}
								style="flex-1 mr-1"
								type="number"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="level"
						rules={{ required: false }}
					/>
				</Card>

				<Card style="my-1">
					<Text className="my-1 text-lg font-outfit">Medical Information </Text>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Allergies"
								placeholder="Enter if any..."
								onBlur={onBlur}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="allergies"
						rules={{ required: false }}
					/>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Additional Medical Info"
								placeholder="Anything else we should know?"
								onBlur={onBlur}
								style="flex-1 mr-1"
								multiline
								numberOfLines={3}
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="additional_medical_info"
						rules={{ required: false }}
					/>
				</Card>

				<View className="w-full my-1 mb-16">
					<CustomButton loading={isLoading} onClick={handleSubmit(onSubmit)} style="my-3">
						Finish
					</CustomButton>
				</View>
			</Body>
		</View>
	);
};

export default CompleteRegistrationScreen;

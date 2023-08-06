import { Text, View } from "react-native";
import { CustomButton, FormInput } from "@ui";
import { CompleteInfo } from "@api";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useAuth, useLocalStorage } from "@hooks";
import { errorTextFieldClass, OAU_DEPARTMENTS, QUERY_KEYS, toast } from "@utils";
import { Body, Header } from "@components/layout";
import { Card } from "@components/ui";
import DateSelector from "@components/ui/DateSelector";
import DropDownPicker from "@components/ui/DropDownPicker";

const CompleteRegistrationScreen = ({}) => {
	//========================Hooks====================================
	const [isLoading, setIsLoading] = useState(false);
	const { saveToStorage } = useLocalStorage();
	const { Logout, user, setUser } = useAuth();
	const router = useRouter();
	const {
		handleSubmit,
		setValue,
		control,
		formState: { errors },
	} = useForm();
	//=================================================================

	// =====================Constants and Lists==========================
	const genderList = [
		{
			label: "Male",
			value: "male",
		},
		{
			label: "Female",
			value: "female",
		},
	];
	const levelsList = [
		{
			label: "100",
			value: "100",
		},
		{
			label: "200",
			value: "200",
		},
		{
			label: "300",
			value: "300",
		},
		{
			label: "400",
			value: "400",
		},
		{
			label: "500",
			value: "500",
		},
	];
	const oau_faculties = OAU_DEPARTMENTS;
	const emailRegex = /\S+@\S+\.\S+/;
	//============================================================

	//==================States================================
	const [dateOfBirth, setDateOfBirth] = useState(
		user?.personal_info?.date_of_birth ? new Date(user?.personal_info?.date_of_birth) : new Date(),
	);
	const [showPicker, setShowPicker] = useState(false);
	const [selectedGender, setSelectedGender] = useState(user?.personal_info?.gender || genderList[0].value);
	const [facultyList, setFacultyList] = useState([{ label: "Select Faculty", value: "select_faculty" }]);
	const [departmentList, setDepartmentList] = useState([{ label: "Select Department", value: "select_department" }]);
	const [selectedFaculty, setSelectedFaculty] = useState(user?.student?.faculty || "Technology");
	const [selectedDepartment, setSelectedDepartment] = useState(user?.student?.department || "Computer Science");
	const [selectedLevel, setSelectedLevel] = useState(user?.student?.level || "300");
	//================================================================

	//====================Effects========================
	useEffect(() => parseFacultyList(oau_faculties, setFacultyList), []); // parse faculty list to dropdown list

	useEffect(() => parseDepartmentList(oau_faculties, selectedFaculty, setDepartmentList), [selectedFaculty]); // parse department list to dropdown list

	const alertEmptyFields = () => {
		if (errors.phone) toast({ message: "Please enter a valid phone number", type: "danger", duration: 3000 });
		if (errors.email) toast({ message: "Please enter a valid email", type: "danger", duration: 3000 });
		if (errors.address) toast({ message: "Please enter a valid address", type: "danger", duration: 3000 });
	};

	useEffect(() => alertEmptyFields, [errors?.address, errors?.email, errors?.phone]);

	useEffect(() => {
		setValue("phone", user?.contact_info?.phone);
		setValue("email", user?.contact_info?.email);
		setValue("address", user?.contact_info?.address);
	}, [user]);

	//============================================================

	//====================Functions========================

	/*overrideBackClick(() => {
		Logout();
	});*/

	const onSubmit = (data) => {
		setIsLoading(true);

		const patched_data = {
			...data,
			date_of_birth: dateOfBirth,
			user_id: user?.user_id,
			first_name: user?.personal_info?.first_name,
			last_name: user?.personal_info?.last_name,
			faculty: selectedFaculty,
			department: selectedDepartment,
			level: selectedLevel,
			gender: selectedGender,
		};

		CompleteInfo(patched_data)
			.then((r) => {
				setIsLoading(false);

				if (!r.error) {
					setUser(r);
					saveToStorage(QUERY_KEYS.user_data, r).then((r) => router.push("/home"));
				} else {
					alert(r.error);
				}
			})
			.catch((e) => {
				setIsLoading(false);
				console.log(e);
			});
	};

	const clickSubmit = () => {
		alertEmptyFields();
		handleSubmit(onSubmit)();
	};

	return (
		<View className={`h-full flex items-center justify-center w-full bg-gray-50`}>
			<Header title="Complete registration" endIcon={<Text>Logout</Text>} endIconClick={Logout} />

			<Body style="py-8">
				<View className="w-full">
					<Text className="my-1"> Enter your details to finish your registration.</Text>
					<Text className="mt-4 text-xs text-gray-500">Fields marked (*) are Required</Text>
				</View>

				<Card className="my-1 mt-6">
					<Text className="my-1 text-lg font-outfit">Personal Information </Text>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Phone number *"
								placeholder="0812 345 6789"
								sx={`${errors.phone && errorTextFieldClass} `}
								onBlur={onBlur}
								defaultValue={user?.contact_info?.phone}
								type="number"
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="phone"
						rules={{ required: true, minLength: 10, maxLength: 11 }}
					/>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Email Address *"
								placeholder="johndoe@student.oauife.edu.eng"
								defaultValue={user?.contact_info?.email}
								onBlur={onBlur}
								sx={`${errors.email && errorTextFieldClass} `}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="email"
						rules={{ required: true, pattern: emailRegex }}
					/>

					<DateSelector
						date={dateOfBirth}
						mode={"date"}
						label={"Date of Birth *"}
						minDate={new Date(1990, 0, 1)}
						maxDate={new Date()}
						formatDateValue={"Do MMMM, YYYY"}
						setDate={setDateOfBirth}
						showPicker={showPicker}
						setShowPicker={setShowPicker}
					/>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Residential Address *"
								sx={`${errors.address && errorTextFieldClass} `}
								placeholder="ex: Block K101, Angola Hall, OAU."
								defaultValue={user?.contact_info?.address}
								onBlur={onBlur}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="address"
						rules={{ required: true }}
					/>

					<DropDownPicker
						prompt="Select your Gender"
						items={genderList}
						label="Gender *"
						style="w-full bg-gray-100 rounded-lg"
						selectionColor="#000"
						selected={selectedGender}
						onSelect={(value) => {
							setSelectedGender(value);
						}}
					/>
				</Card>

				<Card className="my-1">
					<Text className="my-1 text-lg font-outfit">Student Information </Text>
					<Text className="my-1 text-gray-400">
						*To be filled only by students of Obafemi Awolowo University.
					</Text>

					<DropDownPicker
						prompt="Select your faculty"
						items={facultyList}
						label="Faculty *"
						mode={"dialog"}
						style="w-full bg-gray-100 rounded-lg"
						selected={selectedFaculty}
						onSelect={(value) => {
							setSelectedFaculty(value);
						}}
					/>

					<DropDownPicker
						prompt="Select your department"
						items={departmentList}
						label="Department *"
						style="w-full bg-gray-100 rounded-lg"
						selected={selectedDepartment}
						onSelect={(value) => {
							setSelectedDepartment(value);
						}}
					/>

					<DropDownPicker
						prompt="Select your level"
						items={levelsList}
						label="Level *"
						style="w-full bg-gray-100 rounded-lg"
						selected={selectedLevel}
						onSelect={(value) => {
							setSelectedLevel(value);
						}}
					/>
				</Card>

				<Card className="my-1">
					<Text className="my-1 text-lg font-outfit">Medical Information </Text>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Medical Allergies"
								placeholder="Enter if any..."
								onBlur={onBlur}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="allergies"
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
					/>
				</Card>

				<View className="w-full my-1 mb-16">
					<CustomButton loading={isLoading} onClick={clickSubmit} style="my-3">
						Finish
					</CustomButton>
				</View>
			</Body>
		</View>
	);
};

const parseFacultyList = (oau_faculties, setFacultyList) => {
	const list = [];

	Object.keys(oau_faculties || []).forEach((faculty) => {
		const value = faculty.substring(0, 1).toUpperCase() + faculty.substring(1).replaceAll("_", " ");
		list.push({ label: value, value: value.replaceAll(" ", "_").toLowerCase() });
	});

	setFacultyList(list);
};

const parseDepartmentList = (oau_faculties, selectedFaculty, setDepartment) => {
	const department = oau_faculties[selectedFaculty.toLowerCase() || "technology"] || [];
	const list = [];

	department.forEach((department) => {
		const value = department.substring(0, 1).toUpperCase() + department.substring(1).replaceAll("_", " ");
		list.push({ label: value, value: value.toLowerCase() });
	});

	setDepartment(list);
};

export default CompleteRegistrationScreen;

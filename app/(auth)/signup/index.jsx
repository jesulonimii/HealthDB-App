import { Image, Text, View } from "react-native";
import { CustomButton, FormInput } from "@ui";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useAuth, useLocalStorage } from "@hooks";
import OauLogo from "@assets/images/oau-logo.png";
import { errorTextFieldClass, toast } from "@utils";

const SignupScreen = ({}) => {
	const { user, setUser } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(false);
	const { saveToStorage } = useLocalStorage();
	const { Signup } = useAuth();

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { isSubmitting, errors },
	} = useForm();

	const router = useRouter();

	const onSubmit = (data) => {
		setIsLoading(true);

		Signup(data).then((r) => {
			setIsLoading(false);
		});
	};

	useEffect(() => {
		console.log(errors);
		//alertFormError(errors)
	}, [isSubmitting]);

	return (
		<View className={`h-full flex items-center justify-center w-full p-8`}>
			<View className="w-full">
				<Image className="w-12 h-12 mb-5 rounded-full" source={OauLogo} />
				<Text className="text-xl my-2 font-outfit">OAU Health Centre App Registration</Text>
				<Text className="my-1">Enter your details to register to OAU Health Centre Companion App.</Text>
				<Text className="mt-4 text-xs text-gray-500">* - Required</Text>
			</View>

			<View className="w-full py-4">
				<View className="w-full flex-row items-center">
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="First name *"
								placeholder="ex: John"
								onBlur={onBlur}
								sx={`${errors.first_name && errorTextFieldClass} `}
								style={`flex-1 mr-1`}
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="first_name"
						rules={{ required: { value: true, message: "First name is required" } }}
					/>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Last name *"
								placeholder="ex: Doe"
								onBlur={onBlur}
								sx={`${errors.last_name && errorTextFieldClass} `}
								style="flex-1 ml-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="last_name"
						rules={{ required: { value: true, message: "Last name is required" } }}
					/>
				</View>

				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormInput
							label="Matric Number *"
							placeholder="ex: CSC/2023/001"
							onBlur={onBlur}
							sx={`${errors.first_name && errorTextFieldClass} `}
							onChangeText={(value) => onChange(value)}
							value={value}
						/>
					)}
					name="matric_number"
					rules={{ required: { value: true, message: "Matric number is required" }, maxLength: 12 }}
				/>

				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormInput
							type="password"
							label="create password (Min. 8 characters) *"
							placeholder="***********"
							onBlur={onBlur}
							sx={`${errors.password && errorTextFieldClass} `}
							onChangeText={(value) => onChange(value)}
							value={value}
						/>
					)}
					name="password"
					rules={{
						required: { value: true, message: "Password is required" },
						minLength: { value: 8, message: "Password must have a minimum value of 8" },
					}}
				/>

				<CustomButton onClick={handleSubmit(onSubmit)} loading={isLoading} style="w-full my-3">
					Register
				</CustomButton>
			</View>

			<View className="w-full flex-row items-center">
				<Text> Already Registered ?</Text>
				<Link href={"/login"} className="my-1 mx-1 text-primary">
					{" "}
					Login{" "}
				</Link>
			</View>
		</View>
	);
};

const alertFormError = (errors) => {
	if (errors.length === 0) return;
	let warn = "";

	for (let errorsKey in errors) {
		warn = warn + "- " + errors[errorsKey].message + "\n";
	}

	toast({ title: "Please fix this errors:", message: warn, type: "danger" });
};

export default SignupScreen;

import { Image, Text, View } from "react-native";
import { CustomButton, FormInput } from "@ui";
import React, { useContext, useState } from "react";
import { UserContext } from "@context";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useAuth, useLocalStorage } from "@hooks";
import { QUERY_KEYS } from "@utils";
import OauLogo from "@assets/images/oau-logo.png";

const SignupScreen = ({}) => {
	const { user, setUser } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(false);
	const { saveToStorage } = useLocalStorage();
	const { Signup } = useAuth()

	const {
		register,
		handleSubmit,
		watch,
		control,
		formState: { errors },
	} = useForm();

	const router = useRouter();

	const onSubmit = (data) => {
		setIsLoading(true);

		Signup(data)
			.then((r) => {
				setIsLoading(false);
			})
	};

	return (
		<View className={`h-full flex items-center justify-center w-full p-8`}>
			<View className="w-full">
				<Image className="w-12 h-12 mb-5 rounded-full" source={OauLogo} />
				<Text className="text-xl my-2 font-outfit">OAU Health Centre App Registration</Text>
				<Text className="my-1">Enter your details to register to OAU Health Centre Companion App.</Text>
			</View>

			<View className="w-full py-4">
				<View className="w-full flex-row items-center">
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="First name"
								placeholder="ex: John"
								onBlur={onBlur}
								style="flex-1 mr-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="first_name"
						rules={{ required: true }}
					/>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<FormInput
								label="Last name"
								placeholder="ex: Doe"
								onBlur={onBlur}
								style="flex-1 ml-1"
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
						)}
						name="last_name"
						rules={{ required: true }}
					/>
				</View>

				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormInput
							label="Matric Number"
							placeholder="ex: CSC/2023/001"
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
							value={value}
						/>
					)}
					name="matric_number"
					rules={{ required: true }}
				/>

				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormInput
							type="password"
							label="create password"
							placeholder="***********"
							onBlur={onBlur}
							onChangeText={(value) => onChange(value)}
							value={value}
						/>
					)}
					name="password"
					rules={{ required: true, minLength: 8 }}
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

export default SignupScreen;

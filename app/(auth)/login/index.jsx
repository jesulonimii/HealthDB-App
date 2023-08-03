import { Image, Text, View } from "react-native";
import { CustomButton, FormInput } from "@ui";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@context";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { useAuth, useCustomNavigation, useLocalStorage } from "@hooks";
import OauLogo from "@assets/images/oau-logo.png";
import { errorTextFieldClass } from "@utils";

const LoginScreen = ({}) => {
	const { user, setUser } = useContext(UserContext);

	const [isLoading, setIsLoading] = useState(false);
	const { saveToStorage } = useLocalStorage();
	const { overrideBackClick, exitApp } = useCustomNavigation();
	const { Login } = useAuth();

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

		const id = data.id.toLowerCase().trim();
		const password = data.password.trim();

		Login(id, password)
			.then((r) => {
				setIsLoading(false);
			})
			.catch((e) => setIsLoading(false));
	};

	useEffect(() => {
		errors.length > 0 && console.log("form-errors", errors);
	}, [errors]);

	overrideBackClick(() => {
		exitApp();
	});

	return (
		<View className={`h-full flex items-center justify-center w-full p-8`}>
			<View className="w-full">
				<Image className="w-12 h-12 mb-5 rounded-full" source={OauLogo} />
				<Text className="text-xl my-2 font-outfit">OAU Health Centre Sign-in</Text>
				<Text className="my-1">Enter your details to login to OAU Health Centre Companion App.</Text>
				<Text className="mt-4 text-xs text-gray-500">* - Required</Text>
			</View>

			<View className="w-full py-4">
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormInput
							label="User Id *"
							placeholder="ex: CSC/2023/001"
							onBlur={onBlur}
							sx={`${errors.id && errorTextFieldClass} `}
							onChangeText={(value) => onChange(value)}
							value={value}
						/>
					)}
					name="id"
					rules={{ required: true }}
				/>

				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<FormInput
							type="password"
							label="password *"
							placeholder="***********"
							onBlur={onBlur}
							sx={`${errors.password && errorTextFieldClass} `}
							onChangeText={(value) => onChange(value)}
							value={value}
						/>
					)}
					name="password"
					rules={{ required: true }}
				/>

				<CustomButton onClick={handleSubmit(onSubmit)} loading={isLoading} style="w-full my-3">
					Login
				</CustomButton>
			</View>

			<View className="w-full flex-row items-center">
				<Text> New to HeathDB?</Text>
				<Link href={"/signup"} className="my-1 mx-1 text-primary">
					{" "}
					Register{" "}
				</Link>
			</View>
		</View>
	);
};

export default LoginScreen;

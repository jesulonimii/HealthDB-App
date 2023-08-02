import React, { useState } from "react";
import { TextInput, Text, View, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import * as Icons from "react-native-heroicons/outline";

function FormInput({
	placeholder = "Enter text",
	label = null,
	register = {},
	type = "text",
	style = "",
	multiline,
	disabled,
	...rest
}) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<View className={`flex gap-2 my-2 ${style}`}>
			{label && <Text className="text-gray-500 capitalize">{label}</Text>}

			<View className="relative w-full flex flex-row items-center">
				<TextInput
					secureTextEntry={type.toLowerCase() === "password" && !showPassword}
					keyboardType={type.toLowerCase() === "number" ? "numeric" : "default"}
					className="bg-gray-100 rounded-lg p-3 w-full focus:border-primary focus:border"
					placeholder={placeholder}
					editable={!disabled}
					multiline={type.toLowerCase() === "textarea" || multiline}
					{...register}
					{...rest}
				/>

				{type.toLowerCase() === "password" && (
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={() => setShowPassword(!showPassword)}
						className="w-12 h-12 absolute right-0 flex justify-center items-center">
						{showPassword ? (
							<Icons.EyeSlashIcon className="w-full h-full text-primary" />
						) : (
							<Icons.EyeIcon className="w-full h-full text-primary" />
						)}
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
}

FormInput.propTypes = {
	placeholder: PropTypes.string,
	type: PropTypes.string,
	label: PropTypes.string,
	register: PropTypes.object,
	style: PropTypes.string,
	multiline: PropTypes.bool,
};

export default FormInput;

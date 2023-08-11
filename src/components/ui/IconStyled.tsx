import { View } from "react-native";
import React from "react";
import * as Icons from "react-native-heroicons/outline";
import * as Iconly from "@lnanhkhoa/react-native-iconly";
import { HEX2RGBA } from "@utils";

type IconStyledProps = {
	icon: string | React.ReactNode;
	color?: string;
	bgColor?: string;
	size?: number;
	sx?: string;
};

const StyledIcon = ({ icon = "home", color = "#d54b05", bgColor = "#d31616", size, sx }: IconStyledProps) => {
	const getIcon = (icon: string) => {
		const heroPack = Icons[icon];
		const iconlyPack = Iconly[icon];

		return heroPack ? heroPack : iconlyPack ? iconlyPack : Icons.FaceSmileIcon;
	};
	const IconTag = typeof icon === "string" ? getIcon(icon) : (null as keyof JSX.IntrinsicElements);

	return (
		<View
			className={`my-2 rounded-xl w-10 h-10 flex items-center justify-center ${sx}`}
			style={{
				backgroundColor: HEX2RGBA(color || bgColor, 0.2),
			}}>
			{/* @ts-ignore */}

			{typeof icon === "string" ? (
				<IconTag
					primaryColor={color}
					size={size}
					style={{
						color: HEX2RGBA(color || bgColor),
						width: size,
						height: size,
					}}
				/>
			) : (
				icon
			)}
		</View>
	);
};

export default StyledIcon;

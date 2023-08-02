import { Image as ReactImage } from "react-native";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { string } from "@types";

const CustomImage = ({ src, source, defaultImage = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=", style = "", ...rest }) => {

	useEffect(() => {
		if (src){
			source = src;
		}
		if (src === "" || src === " " || src === null || src === undefined) {
			setSrc(defaultImage)
		}
	}, []);

	const [imgSrc, setSrc] = useState(src||source||defaultImage)

	return (
		<>
			<ReactImage
				onError={() => setSrc(defaultImage)}
				source={{ uri: imgSrc }}
				className={twMerge(`w-24 h-24 ${style}`)}
				{...rest} />
		</>
	);
};


CustomImage.propTypes = {
	src: string,
	source: string,
	defaultImage: string,
	style: string,
};

export default CustomImage;
import { Image as ReactImage } from "react-native"
import React, { useEffect, useState } from "react"
import { array, string } from "@types"
import { flattenObject, nativewindConvert } from "@utils"
import { styled } from "nativewind"

const CustomImage = ({
	src,
	defaultImage = "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
	style = {},
	className = "",
	...rest
}) => {
	const [imgSrc, setImgSrc] = useState(src)

	useEffect(() => {
		/*if (src === "" || src === " " || src === null || src === undefined) {
			setImgSrc(defaultImage);
		}*/
	}, [src])

	const fetchStyle = flattenObject(style)

	delete fetchStyle?.childClassNames
	delete fetchStyle?.mask

	const styles = {
		//@ts-ignore
		...nativewindConvert(`w-24 h-24`),
		...fetchStyle,
	}

	return (
		<>
			<ReactImage
				onError={() => {
					console.log("error")
					setImgSrc(defaultImage)
				}}
				source={{ uri: imgSrc }}
				style={styles}
				{...rest}
			/>
		</>
	)
}


CustomImage.propTypes = {
	src: string,
	source: string,
	defaultImage: string,
	style: array,
};

export default styled(CustomImage);
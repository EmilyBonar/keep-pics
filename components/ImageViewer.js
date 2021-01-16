import { useEffect, useState } from "react";

export default function ImageViewer(props) {
	const file =
		typeof props.image === "string"
			? props.image
			: URL.createObjectURL(props.image);

	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [size, setSize] = useState(0);
	const [imageLoaded, setImageLoaded] = useState(false);

	useEffect(() => {
		setSize(file.size);
		console.log(size);
	}, [file]);
	return (
		<div className="flex flex-col items-center gap-2">
			<div className="bg-gray-500 border-2 border-gray-500 rounded md:w-56 md:h-56 h-44 w-44">
				<img
					src={file}
					className="object-scale-down w-full h-full "
					onLoad={(e) => {
						if (!imageLoaded) {
							setDimensions({
								width: e.target.naturalWidth,
								height: e.target.naturalHeight,
							});
							URL.revokeObjectURL(file);
						}
						setImageLoaded(true);
					}}
				></img>
			</div>
			<div className="max-w-4xl text-gray-800">
				<p>
					<span className="font-semibold">Name:</span>{" "}
					{props.name != undefined ? props.name : props.image.name}
				</p>
				<p>
					<span className="font-semibold">Dimensions:</span> {dimensions.width}x
					{dimensions.height}
				</p>
			</div>
		</div>
	);
}

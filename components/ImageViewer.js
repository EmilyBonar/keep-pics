import { useEffect, useState } from "react";

export default function ImageViewer(props) {
	const file =
		typeof props.image === "string"
			? props.image
			: URL.createObjectURL(props.image);
	//const file = URL.createObjectURL(props.image);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [imageLoaded, setImageLoaded] = useState(false);
	return (
		<div className="flex gap-2">
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
			<div className="text-gray-800 w-96">
				<p>
					<span className="font-semibold">Name:</span> {props.image.name}
				</p>
				<p>
					<span className="font-semibold">Size:</span>{" "}
					{(props.image.size / 1024).toFixed(2)} KB
				</p>
				<p>
					<span className="font-semibold">Last Modified:</span>{" "}
					{new Date(props.image.lastModified).toLocaleString()}
				</p>
				<p>
					<span className="font-semibold">Dimensions:</span> {dimensions.width}x
					{dimensions.height}
				</p>
			</div>
		</div>
	);
}

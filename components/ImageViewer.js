import { useEffect, useState } from "react";

export default function ImageViewer(props) {
	const file = URL.createObjectURL(props.image);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [imageLoaded, setImageLoaded] = useState(false);
	return (
		<div className="flex gap-2">
			<div className="bg-gray-500 rounded md:w-96 md:h-96 h-44 w-44">
				<img
					src={file}
					className="object-scale-down w-full h-full"
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
			<div className="">
				<p>Name: {props.image.name}</p>
				<p>Size: {(props.image.size / 1024).toFixed(2)} KB</p>
				<p>
					Last Modified: {new Date(props.image.lastModified).toLocaleString()}
				</p>
				<p>
					Dimensions: {dimensions.width}x{dimensions.height}
				</p>
			</div>
		</div>
	);
}

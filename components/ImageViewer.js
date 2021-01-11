import { useEffect, useState } from "react";

export default function ImageViewer(props) {
	const file = URL.createObjectURL(props.image);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [imageLoaded, setImageLoaded] = useState(false);
	return (
		<div className="flex gap-2">
			<img
				src={file}
				className="max-w-lg border-2 border-black rounded max-h-lg"
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
			<div className="text-gray-200">
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

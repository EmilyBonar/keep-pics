import { useEffect } from "react";

export default function UploadButton(props) {
	useEffect((e) => {});

	return (
		<div className="text-center">
			<input
				type="file"
				id="file"
				accept="image/*"
				className="absolute w-1 h-1 opacity-0"
				onChange={(e) => props.handleFiles(e)}
			/>
			<p className="p-2 m-auto border-2 border-white rounded hover:bg-gray-800 w-min ">
				<label htmlFor="file">Upload</label>
			</p>
			<p id="file-name"></p>
		</div>
	);
}

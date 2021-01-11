import { useEffect } from "react";

export default function SelectButton(props) {
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
			<p className="p-2 m-auto tracking-wide uppercase bg-gray-200 rounded-lg hover:bg-gray-400 w-max ring-white ring-1 hover:ring-2 hover:font-semibold">
				<label htmlFor="file">Select File</label>
			</p>
		</div>
	);
}

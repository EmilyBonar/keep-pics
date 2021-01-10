export default function UploadButton() {
	return (
		<div className="text-center">
			<input
				type="file"
				id="file"
				accept="image/*"
				className="absolute w-1 h-1 opacity-0"
			/>
			<p className="p-2 m-auto border-2 border-white rounded hover:bg-gray-800 w-min ">
				<label for="file">Upload</label>
			</p>
		</div>
	);
}

import { useEffect, useState } from "react";

export default function ImageViewer(props) {
	const [file, setFile] = useState("");

	useEffect(() => {
		setFile(props.file);
	});

	return (
		<div>
			<img src={file}></img>
		</div>
	);
}

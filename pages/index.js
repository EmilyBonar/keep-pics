import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import UploadButton from "../components/UploadButton";
import ImageViewer from "../components/ImageViewer";
import { useState } from "react";

export default function Home() {
	const [image, setImage] = useState("");
	return (
		<div className="grid w-screen h-screen text-white">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar clearImage={() => setImage("")} />
			<main className="grid content-center justify-center w-5/6 h-full grid-flow-row gap-4 m-auto">
				<p className="text-5xl font-bold text-center capitalize">
					Upload anonymously
				</p>
				{image === "" || !image.type.startsWith("image/") ? (
					<UploadButton handleFiles={(e) => setImage(handleFiles(e))} />
				) : (
					<ImageViewer image={image} />
				)}
			</main>
			<Footer />
		</div>
	);
}

function handleFiles(e) {
	const [file] = e.target.files;
	console.log(file);
	// Get the file name and size
	const { name: fileName, size } = file;
	// Convert size in bytes to kilo bytes
	const fileSize = (size / 1000).toFixed(2);
	// Set the text content
	const fileNameAndSize = `${fileName} - ${fileSize}KB`;
	return file;
}

import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SelectButton from "../components/SelectButton";
import ImageViewer from "../components/ImageViewer";
import { useState } from "react";

export default function Home() {
	const [image, setImage] = useState("");
	return (
		<div className="grid w-screen h-screen ">
			<Head>
				<title>KeepPics</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar clearImage={() => setImage("")} />
			<main className="grid content-center justify-center w-5/6 h-full grid-flow-row gap-4 m-auto">
				<p className="text-5xl font-bold text-center capitalize">
					Upload anonymously
				</p>
				{image === "" || !image.type.startsWith("image/") ? (
					<SelectButton handleFiles={(e) => setImage(e.target.files[0])} />
				) : (
					<div>
						<ImageViewer image={image} />
						<div className="w-full text-center">
							<button
								className="p-2 m-2 uppercase bg-gray-200 rounded hover:bg-gray-400"
								onClick={() => {
									//let formData = new FormData();
									//formData.append("file", image);
									fetch("/api/hello", {
										method: "POST",
										body: image,
										headers: {},
									})
										.then((response) => response.json())
										.then((data) => console.log(data));
								}}
							>
								Upload
							</button>
						</div>
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}

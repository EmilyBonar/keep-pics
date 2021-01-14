import { useRouter } from "next/router";
import Head from "next/head";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ImageViewer from "../../components/ImageViewer";
import { useState, useEffect } from "react";

const Image = () => {
	const router = useRouter();
	const { ImageID } = router.query;
	const [image, setImage] = useState("");
	useEffect(() => {});
	return (
		<div className="grid w-screen h-screen ">
			<Head>
				<title>KeepPics</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar />
			<main className="grid content-center justify-center w-5/6 h-full grid-flow-row gap-4 m-auto">
				<ImageViewer image={image} />
			</main>
			<Footer />
		</div>
	);
};

export default Image;

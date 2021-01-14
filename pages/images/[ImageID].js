import { useRouter } from "next/router";
import Head from "next/head";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ImageViewer from "../../components/ImageViewer";
import { useState, useEffect } from "react";
import { server } from "../../config";

const Image = () => {
	const router = useRouter();
	const { ImageID } = router.query;
	const [imageInfo, setImageInfo] = useState({
		location: "",
		name: "",
		timestamp: {},
	});
	useEffect(() => {
		if (ImageID != undefined) {
			fetch(`${server}/api/images/${ImageID}`)
				.then((response) => response.json())
				.then((data) => setImageInfo(data));
		}
	}, [ImageID]);
	console.log({ ImageID, imageInfo });
	return (
		<div className="grid w-screen h-screen ">
			<Head>
				<title>KeepPics</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar />
			<main className="grid content-center justify-center w-5/6 h-full grid-flow-row gap-4 m-auto">
				<ImageViewer image={imageInfo.location} />
			</main>
			<Footer />
		</div>
	);
};

export default Image;

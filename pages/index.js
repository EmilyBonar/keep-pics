import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import UploadButton from "../components/UploadButton";

export default function Home() {
	return (
		<div className="grid w-screen h-screen text-white">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar />
			<main className="grid content-center justify-center w-5/6 h-full grid-flow-row gap-4 m-auto">
				<p className="text-5xl font-bold capitalize">Upload anonymously</p>
				<UploadButton />
			</main>
			<Footer />
		</div>
	);
}

import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
	return (
		<div className="flex flex-col text-white">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar />
			<main className="grid content-center justify-center w-5/6 h-screen m-auto">
				<p className="text-5xl font-bold capitalize">Upload anonymously</p>
			</main>
			<Footer />
		</div>
	);
}

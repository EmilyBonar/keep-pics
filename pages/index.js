import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SelectButton from "../components/SelectButton";
import ImageViewer from "../components/ImageViewer";
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-storage";

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
								onClick={() => postImage(image)}
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

function initializeFirebase() {
	try {
		firebase.initializeApp({
			authDomain: "keep-pics.firebaseapp.com",
			projectId: "keep-pics",
			storageBucket: "keep-pics.appspot.com",
		});
	} catch (error) {
		if (!/already exists/u.test(error.message)) {
			console.error("Firebase admin initialization error", error.stack);
		}
	}
}

async function postImage(image) {
	initializeFirebase();

	var db = firebase.firestore();
	var storage = firebase.storage();

	var newImageRef = db.collection("images").doc();

	let extension = image.name.split(".").pop();
	var storageRef = storage.ref().child(`${newImageRef.id}${extension}`);

	let data = {
		name: image.name,
		location: newImageRef.id,
		timestamp: firebase.firestore.Timestamp.fromDate(new Date(Date.now())),
	};
	console.log(await db.collection("images").get());

	storageRef.put(image);
	newImageRef.set(data);
}

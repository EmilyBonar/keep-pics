import { useRouter } from "next/router";
import Head from "next/head";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ImageViewer from "../../components/ImageViewer";
import { useState, useEffect } from "react";
import { server } from "../../config";
import netlifyAuth from "../../config/netlifyAuth";
import firebase from "firebase/app";
import "firebase/firebase-storage";

const Image = () => {
	const router = useRouter();
	const { ImageID } = router.query;
	const [imageInfo, setImageInfo] = useState({
		location: "",
		name: "",
		timestamp: {},
	});
	const [imageURL, setImageURL] = useState("");
	useEffect(() => {
		if (ImageID != undefined) {
			fetch(`${server}/api/images/${ImageID}`)
				.then((response) => response.json())
				.then((data) => setImageInfo(data));
		}
	}, [ImageID]);

	useEffect(async () => {
		if (imageInfo.location !== "") {
			setImageURL(await getImage(imageInfo.location));
		}
	});

	let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
	let [user, setUser] = useState(null);

	useEffect(() => {
		netlifyAuth.initialize((user) => {
			setLoggedIn(!!user);
			setUser(user);
		});
	}, [loggedIn]);

	let login = () => {
		netlifyAuth.authenticate((user) => {
			setLoggedIn(!!user);
			setUser(user);
			netlifyAuth.closeModal();
		});
	};

	let logout = () => {
		netlifyAuth.signout(() => {
			setLoggedIn(false);
			setUser(null);
		});
	};

	return (
		<div className="grid w-screen h-screen ">
			<Head>
				<title>KeepPics</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar
				clearImage={() => setImage("")}
				login={login}
				logout={logout}
				loggedIn={loggedIn}
				user={user != null ? user : ""}
			/>
			<main className="grid content-center justify-center w-5/6 h-full grid-flow-row gap-4 m-auto">
				<ImageViewer image={imageURL} name={imageInfo.name} />
			</main>
			<Footer />
		</div>
	);
};

export default Image;

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

async function getImage(location) {
	initializeFirebase();
	let imageURL = "";

	var storage = firebase.storage();
	let imageRef = storage.ref(location);
	imageURL = await imageRef.getDownloadURL();
	return imageURL;
}

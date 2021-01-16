import Head from "next/head";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SelectButton from "../components/SelectButton";
import ImageViewer from "../components/ImageViewer";
import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-storage";
import netlifyAuth from "../config/netlifyAuth";
import initializeFirebase from "../config/initializeFirebase";
import { useRouter } from "next/router";

export default function Home() {
	const [image, setImage] = useState("");
	let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
	let [user, setUser] = useState(null);
	const router = useRouter();

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
				<p className="text-5xl font-bold text-center capitalize">
					Upload {loggedIn ? "to your account" : "anonymously"}
				</p>
				{image === "" || !image.type.startsWith("image/") ? (
					<SelectButton handleFiles={(e) => setImage(e.target.files[0])} />
				) : (
					<div>
						<ImageViewer image={image} />
						<div className="w-full text-center">
							<button
								className="p-2 m-2 uppercase bg-gray-200 rounded hover:bg-gray-400"
								onClick={async () =>
									router.push(`/images/${await postImage(image, user)}`)
								}
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

async function postImage(image, user) {
	initializeFirebase();

	var db = firebase.firestore();
	var storage = firebase.storage();

	var newImageRef = db.collection("images").doc();

	let userId = user == null ? "anonymous" : user.id;
	//check if user exists
	let userRef = await db.collection("users").doc(userId);
	if ((await userRef.get()).exists) {
		//if so, add ref to array
		let userData = (await userRef.get()).data();
		userData.images.push(newImageRef.id);
		userRef.set(userData);
	} else {
		//if not, create them
		db.collection("users")
			.doc(userId)
			.set({ images: [newImageRef.id] });
	}

	//let extension = image.name.split(".").pop();
	var storageRef = storage.ref().child(`${newImageRef.id}`);

	let data = {
		name: image.name,
		location: newImageRef.id,
		timestamp: firebase.firestore.Timestamp.fromDate(new Date(Date.now())),
		user: userId,
	};

	storageRef.put(image);
	newImageRef.set(data);

	return newImageRef.id;
}

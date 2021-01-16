import { useRouter } from "next/router";
import Head from "next/head";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ImageViewer from "../../components/ImageViewer";
import { useState, useEffect } from "react";
import { server } from "../../config";
import netlifyAuth from "../../config/netlifyAuth";
import initializeFirebase from "../../config/initializeFirebase";
import firebase from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/firebase-storage";
import Link from "next/link";

const User = () => {
	const router = useRouter();
	const { UserID } = router.query;
	const [userInfo, setUserInfo] = useState({
		images: [],
	});
	const [imageInfo, setImageInfo] = useState([]);

	useEffect(async () => {
		if (UserID != undefined) {
			let data = await (await fetch(`${server}/api/users/${UserID}`)).json();
			let array = data.images.map((pic) => {
				return getImage(pic.location);
			});

			Promise.all(array).then((res) => {
				let pushArr = [];
				for (let i = 0; i < res.length; i++) {
					pushArr.push({
						image: res[i],
						name: data.images[i].name,
						id: data.images[i].location,
					});
				}
				setImageInfo(pushArr);
			});
		}
	}, [UserID]);

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
				login={login}
				logout={logout}
				loggedIn={loggedIn}
				user={user != null ? user : ""}
			/>
			<main className="grid content-center justify-center w-5/6 h-full grid-flow-row gap-4 m-auto">
				<p className="text-3xl font-bold text-center capitalize">
					Your pictures
				</p>
				{imageInfo.length != 0 ? (
					<div className="grid gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
						{imageInfo.map((pic) => (
							<div className="flex gap-2">
								<Link href={`../images/${pic.id}`}>
									<a>
										<ImageViewer
											key={pic.id}
											image={pic.image}
											name={pic.name}
										/>
									</a>
								</Link>
								<button
									className="w-6 h-6 text-white bg-red-700 rounded-lg"
									onClick={() => {
										deleteImage(pic.id);
									}}
								>
									X
								</button>
							</div>
						))}
					</div>
				) : (
					<p className="text-center">You don't have any pictures</p>
				)}
			</main>
			<Footer />
		</div>
	);
};

export default User;

async function getImage(location) {
	initializeFirebase();

	var storage = firebase.storage();
	let imageRef = storage.ref(location);
	let imageURL = await imageRef.getDownloadURL();
	return imageURL;
}

async function deleteImage(location) {
	initializeFirebase();

	var db = firebase.firestore();
	var storage = firebase.storage();

	let dbImageRef = db.collection("images").doc(location);
	let dbImageData = (await dbImageRef.get()).data();
	let userID = dbImageData.user;
	dbImageRef.delete();

	//delete db doc
	//delete from user images array
	let dbUserRef = db.collection("users").doc(userID);
	let dbUserData = (await dbUserRef.get()).data();
	dbUserData.images = dbUserData.images.filter((image) => image != location);
	dbUserRef.set(dbUserData);

	//delete from storage
	var storageImageRef = storage.ref(location);
	storageImageRef.delete();
}

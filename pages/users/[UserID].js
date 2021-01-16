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
import "firebase/firebase-storage";

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
					pushArr.push({ image: res[i], name: data.images[i].name });
				}
				setImageInfo(pushArr);
			});
		}
	}, [UserID]);

	useEffect(async () => {
		for (let i = 0; i < userInfo.images.length; i++) {
			let locInfo = imageInfo;
			locInfo.push({
				location: await getImage(userInfo.images[i].location),
				name: userInfo.images[i].name,
			});
			setImageInfo(locInfo);
		}
	}, [userInfo]);

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
				<div className="grid grid-cols-4">
					{imageInfo.map((pic, i) => (
						<ImageViewer key={i} image={pic.image} name={pic.name} />
					))}
				</div>
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

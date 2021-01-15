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
	const [imageURL, setImageURL] = useState("");
	useEffect(() => {
		if (UserID != undefined) {
			fetch(`${server}/api/users/${UserID}`)
				.then((response) => response.json())
				.then((data) => setUserInfo(data));
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
				clearImage={() => setImage("")}
				login={login}
				logout={logout}
				loggedIn={loggedIn}
				user={user != null ? user : ""}
			/>
			<main className="grid content-center justify-center w-5/6 h-full grid-flow-row gap-4 m-auto"></main>
			<Footer />
		</div>
	);
};

export default User;

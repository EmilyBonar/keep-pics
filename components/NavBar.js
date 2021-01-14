import Link from "next/link";
import { useEffect, useState } from "react";
import netlifyAuth from "../config/netlifyAuth";

export default function NavBar(props) {
	let [loggedIn, setLoggedIn] = useState(netlifyAuth.isAuthenticated);
	let [user, setUser] = useState(null);

	useEffect(() => {
		netlifyAuth.initialize((user) => {
			setLoggedIn(!!user);
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

	console.log(loggedIn);
	return (
		<div className="w-full">
			<nav className="flex ">
				<Logo clearImage={props.clearImage} />
				<span className="flex-grow"></span>
				<button className="p-2 text-xl" onClick={login}>
					Log In
				</button>
			</nav>
		</div>
	);
}

function Logo(props) {
	return (
		<Link href="/">
			<a onClick={props.clearImage} className="p-2 text-xl">
				KeepPics
			</a>
		</Link>
	);
}

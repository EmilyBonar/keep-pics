import Link from "next/link";

export default function NavBar(props) {
	return (
		<div className="w-full">
			<nav className="flex ">
				<Logo clearImage={props.clearImage} />
				<span className="flex-grow"></span>
				<Account
					login={props.login}
					logout={props.logout}
					loggedIn={props.loggedIn}
					user={props.user}
				/>
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

function Account(props) {
	return (
		<div>
			{props.loggedIn ? (
				<div className="flex gap-4 p-2 text-xl">
					<p>{`Hi, ${props.user}`}</p>
					<button className="" onClick={props.logout}>
						Log Out
					</button>
				</div>
			) : (
				<button className="p-2 text-xl" onClick={props.login}>
					Log In
				</button>
			)}
		</div>
	);
}

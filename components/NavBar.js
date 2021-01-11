import Link from "next/link";

export default function NavBar(props) {
	return (
		<div className="w-full">
			<nav className="flex ">
				<Logo clearImage={props.clearImage} />
				<span className="flex-grow"></span>
				<button className="p-2 text-xl">Log In</button>
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

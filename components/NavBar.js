import Link from "next/link";

export default function NavBar(props) {
	return (
		<div className="w-full">
			<nav flex className="flex text-white">
				<Logo />
				<span className="flex-grow"></span>
				<button className="p-2 text-xl">Log In</button>
			</nav>
		</div>
	);
}

function Logo() {
	return (
		<Link href="/">
			<a className="p-2 text-xl">KeepPics</a>
		</Link>
	);
}

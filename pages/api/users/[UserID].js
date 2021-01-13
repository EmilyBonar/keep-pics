import admin from "./../firebaseConnect";
import fetch from "node-fetch";
import { server } from "../../../config";

export default async function handle(req, res) {
	var db = admin.firestore();

	const {
		query: { UserID },
	} = req;
	let querySnapshot = await db.collection("users").doc(UserID).get();
	let data = querySnapshot.data();
	Promise.all(
		(data.images = await data.images.map(async (image) => {
			const response = await fetch(`${server}/api/images/${image}`);
			return await response.json();
		})),
	).then((images) => {
		res.statusCode = 200;
		res.json({ images });
	});

	//
	//res.json(data);
}

import { storage } from "firebase-admin";
import admin from "./../firebaseConnect";

export default async function handle(req, res) {
	var db = admin.firestore();
	var bucket = admin.storage().bucket();
	let image = req.body;
	let ret = [];
	/*
	let querySnapshot = await db.collection("images").get();

	querySnapshot.forEach((doc) => {
		ret.push(doc.data());
    });
    */
	//console.log(await bucket.getFiles());
	//let dbImage = await db.collection("images").doc().set({});
	await bucket.put(image, { destination: "test" });
	//console.log(image);
	res.statusCode = 200;
	res.json(ret);
	if (req.method === "POST") {
		// Process a POST request
		res.statusCode = 201;
	} else {
		// Handle any other HTTP method
		res.statusCode = 405;
	}
}

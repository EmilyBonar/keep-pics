import admin from "./../firebaseConnect";

export default async function handle(req, res) {
	var db = admin.firestore();

	let ret = [];
	/*
	let querySnapshot = await db.collection("images").get();

	querySnapshot.forEach((doc) => {
		ret.push(doc.data());
    });
    */

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

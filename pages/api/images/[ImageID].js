import admin from "./../firebaseConnect";

export default async function handle(req, res) {
	var db = admin.firestore();

	const {
		query: { ImageID },
	} = req;
	let querySnapshot = await db.collection("images").doc(ImageID).get();
	/*
	querySnapshot.forEach((doc) => {
		console.log(doc.data());
	});
	*/

	res.statusCode = 200;
	res.json(querySnapshot.data());
}

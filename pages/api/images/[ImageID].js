import admin from "./../firebaseConnect";

export default async function handle(req, res) {
	var db = admin.firestore();

	const {
		query: { ImageID },
	} = req;
	let querySnapshot = await db.collection("images").doc(ImageID).get();

	res.statusCode = 200;
	res.json(querySnapshot.data());
}

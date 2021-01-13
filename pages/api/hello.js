// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import admin from "./firebaseConnect";

export default async function handle(req, res) {
	var db = admin.firestore();

	let ret = [];

	let querySnapshot = await db.collection("images").get();

	querySnapshot.forEach((doc) => {
		ret.push(doc.data());
	});

	res.statusCode = 200;
	res.json(ret);
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/firestore";

import dotenv from "dotenv";
dotenv.config();

export default async function handle(req, res) {
	const firebaseConfig = {
		apiKey: process.env.apiKey,
		authDomain: process.env.authDomain,
		projectId: process.env.projectId,
		storageBucket: process.env.storageBucket,
		messagingSenderId: process.env.messagingSenderId,
		appId: process.env.appId,
		measurementId: process.env.measurementId,
	};

	// Initialize Firebase
	if (!firebase.apps.length) {
		firebase.initializeApp(firebaseConfig);
	} else {
		firebase.app(); // if already initialized, use that one
	}
	var db = firebase.firestore();
	let ret = [];
	let querySnapshot = await db.collection("images").get();
	querySnapshot.forEach((doc) => {
		ret.push(doc.data());
	});

	res.statusCode = 200;
	res.json(ret);
}

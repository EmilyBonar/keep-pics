// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
import * as admin from "firebase-admin";

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

	const serviceAccount = {
		type: process.env.serviceAccount,
		project_id: process.env.project_id,
		private_key_id: process.env.private_key_id,
		private_key: process.env.private_key.replace(/\\n/g, "\n"),
		client_email: process.env.client_email,
		client_id: process.env.client_id,
		auth_uri: process.env.auth_uri,
		token_url: process.env.token_url,
		auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
		client_x509_cert_url: process.env.client_x509_cert_url,
	};

	// Initialize Firebase
	if (!admin.apps.length) {
		//firebase.initializeApp(firebaseConfig);
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: "https://databaseName.firebaseio.com",
		});
	} else {
		//firebase.app(); // if already initialized, use that one
		admin.app();
		console.log("wrong");
	}
	//var db = firebase.firestore();
	var db = admin.firestore();
	let ret = [];

	let querySnapshot = await db.collection("images").get();
	/*
	querySnapshot.forEach((doc) => {
		ret.push(doc.data());
  });
  */
	db.goOffline();
	res.statusCode = 200;
	res.json(ret);
}

import * as admin from "firebase-admin";

import dotenv from "dotenv";
dotenv.config();

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
try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://keep-pics.firebaseio.com",
		storageBucket: "keep-pics.appspot.com",
	});
} catch (error) {
	if (!/already exists/u.test(error.message)) {
		console.error("Firebase admin initialization error", error.stack);
	}
}

export default admin;

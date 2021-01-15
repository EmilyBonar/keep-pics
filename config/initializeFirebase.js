import firebase from "firebase/app";
import "firebase/firebase-storage";

export default function initializeFirebase() {
	try {
		firebase.initializeApp({
			authDomain: "keep-pics.firebaseapp.com",
			projectId: "keep-pics",
			storageBucket: "keep-pics.appspot.com",
		});
	} catch (error) {
		if (!/already exists/u.test(error.message)) {
			console.error("Firebase admin initialization error", error.stack);
		}
	}
}

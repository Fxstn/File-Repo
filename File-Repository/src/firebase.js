import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const app = firebase.initializeApp({
	apiKey: "AIzaSyDHh_gBlVTRVkzcCz2MdcPsPAjQYu8BfTA",
	authDomain: "file-repodev-86fd7.firebaseapp.com",
	projectId: "file-repodev-86fd7",
	storageBucket: "file-repodev-86fd7.appspot.com",
	messagingSenderId: "562062393581",
	appId: "1:562062393581:web:84b4cfbf63210dd1b48ce4",
});

const firestore = app.firestore();
export const database = {
	folders: firestore.collection("folders"),
	files: firestore.collection("files"),
	formatDoc: (doc) => {
		return {id: doc.id, ...doc.data()};
	},
	getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const database2 = {
	folders: firestore.collection("folders"),
	files: firestore.collection("files"),
	formatDoc: (doc) => {
		return {id: doc.id, ...doc.data()};
	},
	getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp,
};
export const storage = app.storage();
export const auth = app.auth();
export default app;

/* DEFAULT AUTH
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
	match /{document=**} {
	allow read, write: if
	request.time < timestamp.date(2022,12,31)
	}
  }
}
*/

/* FOR AUTHENTICATION OF EACH USER ON THEIR FILES (1:11)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
	match /{document=**} {
	function authed () {
		return request.auth !=null
	}
	function matchesUser(data){
		return request.auth.uid == data.userId
	}
	allow read: if authed() && matchesUser(resource.data)
	allow create: if authed() && matchesUser(request.resource.data)
	}
  }
}
*/

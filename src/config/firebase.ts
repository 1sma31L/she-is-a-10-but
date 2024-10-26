import { GoogleAuthProvider, getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyB6SwAF6IbaSnsGByatfZQIem_7f35EQV8",
	authDomain: "she-is-a-10-but.firebaseapp.com",
	projectId: "she-is-a-10-but",
	storageBucket: "she-is-a-10-but.appspot.com",
	messagingSenderId: "802762964394",
	appId: "1:802762964394:web:6bd0df83583e29924b3fd3",
	measurementId: "G-E3M9LVCDB3",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export { app, db, auth, googleProvider, storage };

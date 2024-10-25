import { getAuth, onAuthStateChanged } from "firebase/auth";

import { app } from "@/config/firebase";

const auth = getAuth(app);
let isUserAuthenticated: boolean;
onAuthStateChanged(auth, (user) => {
	user ? (isUserAuthenticated = true) : (isUserAuthenticated = false);
});
export { isUserAuthenticated };

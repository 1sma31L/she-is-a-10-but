import { UserCredential, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";

export async function signinWithGoogle(): Promise<null | UserCredential> {
	try {
		const result = await signInWithPopup(auth, googleProvider);
		console.log("User:", result.user);
		return result;
	} catch (error) {
		console.error("Sign-in error:", error);
		return null;
	}
}

import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";

// Get users from firestore
import { db } from "@/config/firebase";

export type TUser = {
	youHaveCrushOn: string | null;
	HaveCrushOnYou: string[] | null;
	verified: boolean;
	name: string;
	email: string;
	gender: "male" | "female" | null;
	rates: number[] | null;
	imgsrc: string | null;
	grade: string | null;
	peopleRated: string[] | null;
};

async function getAllUsers(currentUserEmail: string): Promise<TUser[] | null> {
	try {
		const usersRef = collection(db, "users");
		const snapshot = await getDocs(usersRef);

		if (snapshot.empty) {
			console.log("No matching documents.");
			return null;
		}

		const users: any = [];
		snapshot.forEach((doc) => {
			users.push({ id: doc.id, ...doc.data() });
		});
		return users;
	} catch (error) {
		console.error("Error retrieving users:", error);
		return null;
	}
}

async function getRatedUsers(
	documentId: string,
	fieldName: string
): Promise<string[] | null> {
	try {
		// Reference to the document using its ID
		const docRef = doc(db, "users", documentId);

		// Get the document
		const docSnap = await getDoc(docRef);

		// Check if the document exists
		if (docSnap.exists()) {
			// Get the desired field
			const fieldValue = docSnap.data()[fieldName];
			return fieldValue; // Return the field value
		} else {
			console.log("No such document!");
			return null; // Document doesn't exist
		}
	} catch (error) {
		console.error("Error fetching document: ", error);
		return null;
	}
}
export const getUserByEmail = async (email: string) => {
	try {
		const usersRef = collection(db, "users");
		const q = query(usersRef, where("email", "==", email));
		const snapshot = await getDocs(q);

		if (snapshot.empty) {
			console.warn("No user found with that email.");
			return null; // No user found
		}

		// Assuming emails are unique, return the first matched user
		const userData = snapshot.docs[0].data();
		const userId = snapshot.docs[0].id; // Get user ID
		return { id: userId, ...userData };
	} catch (error) {
		console.error("Error fetching user by email:", error);
		return null;
	}
};
export { getAllUsers, getRatedUsers };

import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// Get users from firestore
import { db } from "@/config/firebase";

export type TUser = {
	name: string;
	email: string;
	gender: "male" | "female" | null;
	rates: number[] | null;
	grade: string | null;
	peopleRated: string[] | null;
};
async function getAllUsers(): Promise<TUser[] | null> {
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

		console.log(users);
		return users;
	} catch (error) {
		console.error("Error retrieving users:", error);
		return null;
	}
}
const Users = await getAllUsers();

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
			console.log(`Field value: ${fieldValue}`);
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
export { Users, getRatedUsers };

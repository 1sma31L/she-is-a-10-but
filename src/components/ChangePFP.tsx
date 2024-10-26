"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "@/config/firebase";
import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { TUser } from "@/lib/firestore";
import { storage } from "@/config/firebase"; // Adjust the import based on your firebase config

export default function DialogDemo() {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [user, setUser] = useState<User | undefined>(undefined);
	const [currentTUser, setCurrentTUser] = useState<TUser | null>(null);
	const collectionRef = collection(db, "users");

	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user); // Set user ID when user is signed in
			} else {
				setUser(undefined); // Reset user ID when no user is signed in
			}
		});

		return () => unsubscribe(); // Clean up the subscription on unmount
	}, []);

	useEffect(() => {
		if (user) {
			const fetchUser = async () => {
				const snapshot = await getDocs(
					query(collectionRef, where("email", "==", user.email))
				);
				const userData = snapshot.docs[0]?.data() as TUser;

				setCurrentTUser(userData);
				console.log("Current User:", userData);
			};
			fetchUser();
		}
	}, [user]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			setFile(event.target.files[0]);
		}
	};

	const handleUpload = async () => {
		if (!file) return;
		setUploading(true);
		if (!user) return;
		try {
			const storageRef = ref(storage, `profilePictures/${user.uid}`);
			await uploadBytes(storageRef, file);

			const downloadURL = await getDownloadURL(storageRef);
			const userRef = doc(db, "users", user.uid);

			await updateDoc(userRef, {
				imgsrc: downloadURL,
			});

			console.log("Profile picture updated successfully!");
		} catch (error) {
			console.error("Error uploading profile picture:", error);
		} finally {
			setUploading(false);
			setFile(null);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Change Your Profile Picture</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Choose Your Profile Picture</DialogTitle>
				</DialogHeader>
				<div className="w-full flex flex-col items-center">
					<label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
						<span className="text-gray-500">
							Drag and drop or click to upload
						</span>
						<input
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							className="hidden" // Hide the default file input
						/>
					</label>

					{/* Image Preview */}
					{file && (
						<img
							src={URL.createObjectURL(file)} // Create a URL for the uploaded image
							alt="Preview"
							className="mt-4 w-32 h-32 rounded-full object-cover"
						/>
					)}

					{/* <button
						onClick={handleUpload}
						disabled={uploading || !file} // Disable if uploading or no file selected
						className={`mt-4 px-6 py-2 rounded-lg text-white transition ${
							uploading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
						}`}>
						{uploading ? "Uploading..." : "Change Profile Picture"}
					</button> */}
				</div>

				<DialogClose asChild>
					<Button
						variant={"outline"}
						onClick={handleUpload}
						disabled={uploading || !file} // Disable if uploading or no file selected
					>
						{uploading ? "Uploading..." : "Change Profile Picture"}
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}

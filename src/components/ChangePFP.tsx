"use client";

import {
	Dialog,
	DialogContent,
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
import { storage } from "@/config/firebase";

export default function DialogDemo() {
	const [file, setFile] = useState<File | null>(null);
	const [uploading, setUploading] = useState(false);
	const [user, setUser] = useState<User | undefined>(undefined);
	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(undefined);
			}
		});

		return () => unsubscribe();
	}, []);

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
				<Button className="w-full" variant={"secondary"}>
					Change Your Profile Picture
				</Button>
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
				</div>

				{/* <DialogClose asChild> */}
				<Button
					variant={"outline"}
					onClick={handleUpload}
					disabled={uploading || !file} // Disable if uploading or no file selected
				>
					{uploading ? "Uploading..." : "Change Profile Picture"}
				</Button>
				{/* </DialogClose> */}
			</DialogContent>
		</Dialog>
	);
}

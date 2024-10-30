"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import React, { useEffect, useState } from "react";
import { app, auth, db } from "@/config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function DeleteAccount() {
	const Router = useRouter();
	const [user, setUser] = useState(auth.currentUser);
	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user); // Set user ID when user is signed in
			} else {
				setUser(null); // Reset user ID when no user is signed in
			}
		});

		return () => unsubscribe(); // Clean up the subscription on unmount
	}, [user]);
	const HandleDelete = async () => {
		try {
			auth.currentUser?.delete();
			if (user?.uid) {
				const docref = doc(db, "users", user.uid);
				await deleteDoc(docref);
				console.log("User deleted successfully");
				Router.push("/login");
			} else {
				console.error("User ID is undefined");
			}
		} catch (error) {
			console.error("Error Deleting User out: ", error);
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="w-full">Delete Your Account</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="px-1">
						Are you sure you want to delete your account
					</DialogTitle>
					<div className="flex justify-between items-center gap-4 pt-4">
						<Button
							variant={"destructive"}
							className="flex-1"
							onClick={HandleDelete}>
							Delete
						</Button>
						<DialogClose className="flex-1" asChild>
							<Button variant={"secondary"} className="w-full">
								Cancel
							</Button>
						</DialogClose>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default DeleteAccount;

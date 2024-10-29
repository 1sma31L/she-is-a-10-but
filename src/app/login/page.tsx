"use client";

import React, { useState } from "react";
import { auth, db } from "@/config/firebase";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Ensure Checkbox is correctly typed
import Dialog from "@/components/Dialog";
import { FaGoogle } from "react-icons/fa";
import { UserCredential } from "firebase/auth";
import { signinWithGoogle } from "@/config/signin";
import { useRouter } from "next/navigation";

async function userExists(userId: string) {
	const userRef = doc(db, "users", userId);
	const docSnapshot = await getDoc(userRef);

	console.log(`Checking existence for user ID: ${userId}`); // Debugging line
	console.log(`Document exists: ${docSnapshot.exists()}`); // Debugging line

	return docSnapshot.exists();
}

function Home() {
	const [errorMessage, setErrorMessage] = useState<string>(""); // Add error message state
	const [isSigninWithGoogle, setIsSigninWithGoogle] = useState(false);
	const [user, setUser] = useState<UserCredential>();
	const [userExistsFlag, setUserExistsFlag] = useState(true);
	const router = useRouter();

	const handleClick = async () => {
		try {
			const userInfo = await signinWithGoogle();
			if (!userInfo) {
				return;
			} else if (!userInfo.user.email?.endsWith("ensta.edu.dz")) {
				setErrorMessage("Please use your ENSTA email to sign in!");
				auth.currentUser
					?.delete()
					.then(() => {
						console.log("User signed out due to invalid email domain");
						// Optionally display a message to the user or redirect
					})
					.catch((error) => {
						console.error("Error signing out: ", error);
					});
				return;
			}
			setUser(userInfo);
			setIsSigninWithGoogle(true);
			const collectionRef = collection(db, "users");

			console.log(`User info:`, userInfo); // Debugging line
			const snapshot = await getDocs(
				query(collectionRef, where("email", "==", user?.user.email))
			);
			const userData = snapshot.docs[0]?.data();

			const userExistsFlag = !!userData;

			console.log(`User exists check result: ${userExistsFlag}`); // Debugging line
			setUserExistsFlag(userExistsFlag);

			if (!userExistsFlag) {
				const userDocRef = doc(db, "users", userInfo.user.uid);
				await setDoc(userDocRef, {
					imgsrc: userInfo.user.photoURL ? userInfo.user.photoURL : "",
					name: userInfo.user.displayName,
					email: userInfo.user.email,
					gender: null,
					rates: [],
					grade: null,
					peopleRated: [],
					verified: false,
				});
				console.log("User added to Firestore.");
			} else {
				console.log("User already exists, not adding.");
				router.push("/rate");
			}
		} catch (error) {
			console.error("Error during sign in or adding user:", error);
		}
	};
	const [isChecked, setIsChecked] = useState(false);

	return (
		<main className="container mx-auto flex justify-center items-center h-screen">
			{!isSigninWithGoogle ? (
				<div className="flex flex-col justify-center items-center gap-3 w-[330px]">
					<div className="flex flex-col gap-1">
						<h2 className="font-bold text-lg">Terms And Conditions</h2>
						<div className="overflow-y-auto h-48 text-xs text-muted-foreground p-2 border border-gray-300 rounded-md flex flex-col gap-4">
							<p>
								<strong>Effective Date:</strong> 26th October 2024.
							</p>

							<p>
								Welcome to <strong>She&apos;s a 10 but...</strong> website, By
								logging in and using our website, you agree to the following
								terms regarding your data:
							</p>

							<p>
								<strong>*User Data Collection:</strong>
								<br />
								Users may voluntarily provide personal information, including
								their name, family name, email, gender, and grade. By submitting
								this information, you consent to its use on the site as outlined
								in this agreement.
							</p>

							<p>
								<strong>*Public Sharing</strong>
								<br />
								The information you choose to share may be made publicly
								accessible on the site. You acknowledge that any information
								shared will be visible to other users.
							</p>

							<p>
								<strong>*Account Deletion</strong>
								<br />
								Users cannot delete their accounts through the website. To
								request account deletion, you must contact{" "}
								<strong>
									<a href="mailto:im.boussekine@gmail.com">
										im.boussekine@gmail.com
									</a>{" "}
								</strong>
								directly.
							</p>

							<p>
								<strong>*Data Security</strong>
								<br />
								We take reasonable measures to protect your personal
								information; however, we cannot guarantee absolute security. By
								using our site, you acknowledge the inherent risks involved in
								sharing personal data online.
							</p>

							<p>
								<strong>*Changes to Terms</strong>
								<br />
								We reserve the right to modify these Terms of Use at any time.
								Continued use of the site following changes constitutes
								acceptance of those changes.
							</p>
							<p>
								Thank you for reviewing our Terms of Use, <br />
								<strong>BOUSSEKINE M. Ismail</strong>
							</p>
						</div>
					</div>
					<div className="flex items-center w-full justify-center gap-2 ">
						<Checkbox
							id="terms"
							checked={isChecked}
							onCheckedChange={() => {
								setIsChecked((prev) => !prev);
							}} // Use onCheckedChange for Radix CheckBox
						/>{" "}
						<label
							htmlFor="terms"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Accept terms and conditions
						</label>
					</div>
					<Button
						onClick={handleClick}
						className="w-full transition-all duration-300"
						disabled={!isChecked}>
						<span>Login using Google </span>
						<span>
							<FaGoogle />
						</span>
					</Button>
					{
						// Add error message display
						errorMessage && (
							<div className="text-sm text-red-500 rounded-sm w-full px-2 py-2 bg-red-100/25 text-center border">
								{errorMessage}
							</div>
						)
					}
				</div>
			) : !userExistsFlag ? (
				<div className="flex flex-col justify-center items-center gap-5">
					<p>
						Hello{" "}
						<strong className="capitalize">{user?.user.displayName}</strong>{" "}
					</p>
					<div>
						<Dialog userId={user?.user.uid ?? ""} />
					</div>
				</div>
			) : null}
		</main>
	);
}

export default Home;

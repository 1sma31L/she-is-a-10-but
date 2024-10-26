"use client";

import React, { useState } from "react";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Ensure Checkbox is correctly typed
import Dialog from "@/components/Dialog";
import { FaGoogle } from "react-icons/fa";
import { UserCredential } from "firebase/auth";
import { db } from "@/config/firebase";
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
	const [isSigninWithGoogle, setIsSigninWithGoogle] = useState(false);
	const [user, setUser] = useState<UserCredential>();
	const [userExistsFlag, setUserExistsFlag] = useState(true);
	const router = useRouter();

	const handleClick = async () => {
		try {
			const userInfo = await signinWithGoogle();
			if (!userInfo) {
				return;
			}
			setUser(userInfo);
			setIsSigninWithGoogle(true);

			console.log(`User info:`, userInfo); // Debugging line
			const userExistsFlag = await userExists(userInfo.user.uid);
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
					<div className="flex flex-col gap-2">
						<h2 className="font-bold text-lg">Terms Of Use</h2>
						<div className="overflow-y-auto h-48 text-xs text-muted-foreground p-2 border border-gray-300 rounded-md flex flex-col gap-4">
							<p>
								<strong>Effective Date:</strong> 26th October 2024.
							</p>

							<p>
								Welcome to <strong>She&apo;s a 10 but...</strong>! By using our
								website, you agree to the following terms regarding your data:
							</p>

							<p>
								<strong>* User Data Collection:</strong>
								<br />
								Users may voluntarily provide personal information, including
								their name, family name, email, gender, and grade. By submitting
								this information, you consent to its use on the site as outlined
								in this agreement.
							</p>

							<p>
								<strong>Public Sharing</strong>
								<br />
								The information you choose to share may be made publicly
								accessible on the site. You acknowledge that any information
								shared will be visible to other users.
							</p>

							<p>
								<strong>Account Deletion</strong>
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
								<strong>Data Security</strong>
								<br />
								We take reasonable measures to protect your personal
								information; however, we cannot guarantee absolute security. By
								using our site, you acknowledge the inherent risks involved in
								sharing personal data online.
							</p>

							<p>
								<strong>Changes to Terms</strong>
								<br />
								We reserve the right to modify these Terms of Use at any time.
								Continued use of the site following changes constitutes
								acceptance of those changes.
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
				</div>
			) : !userExistsFlag ? (
				<div className="flex flex-col justify-center items-center gap-5">
					<p>
						Hello{" "}
						<strong className="capitalize">
							{user?.user.displayName?.split(" ")[0]}
						</strong>{" "}
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

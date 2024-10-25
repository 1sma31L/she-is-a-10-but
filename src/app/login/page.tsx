"use client";

import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import Dialog from "@/components/Dialog";
import { FaGoogle } from "react-icons/fa";
import React from "react";
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
	const [isSigninWithGoogle, setIsSigninWithGoogle] = React.useState(false);
	const [user, setUser] = React.useState<UserCredential>();
	const [userExistsFlag, setUserExistsFlag] = React.useState(true);
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
					name: userInfo.user.displayName,
					email: userInfo.user.email,
					gender: null,
					rates: [],
					grade: null,
					peopleRated: [],
				});
				console.log("User added to Firestore."); // Debugging line
			} else {
				console.log("User already exists, not adding."); // Debugging line
				router.push("/rate");
			}
		} catch (error) {
			console.error("Error during sign in or adding user:", error);
		}
	};

	return (
		<main className="container mx-auto flex justify-center items-center h-screen">
			{!isSigninWithGoogle ? (
				<div className="flex flex-col justify-center items-center gap-3">
					<Button onClick={handleClick}>
						<span>Login using Google </span>
						<span>
							<FaGoogle />
						</span>
					</Button>
					<div className="text-xs text-muted-foreground">
						<ul className="flex flex-col gap-1">
							<li>
								- Only <strong>CP1/CP2</strong> are allowed to access this
								website.
							</li>
							<li>
								- You have to use the Gmail provided by the{" "}
								<strong>school</strong>.
							</li>
						</ul>
					</div>
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

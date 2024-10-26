"use client";

import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import React from "react";
import { TUser } from "@/lib/firestore";
import { useRouter } from "next/navigation";

function Profile() {
	const [user, setUser] = useState<User | undefined>(undefined);
	const [currentTUser, setCurrentTUser] = useState<TUser | null>(null);
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
	const collectionRef = collection(db, "users");

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
	const validRates =
		currentTUser?.rates?.filter((rate) => typeof rate === "number") ?? [];
	const average =
		validRates.length > 0
			? (validRates.reduce((a, b) => a + b, 0) / validRates.length).toFixed(1)
			: "N/A";
	const auth = getAuth(app); // Get the auth instance
	const Router = useRouter();
	const handleLogout = async () => {
		try {
			await signOut(auth);
			console.log("User signed out successfully");
			Router.push("/login");
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};
	return (
		<main className="container mx-auto flex justify-center items-center h-[80vh]">
			<div className="flex justify-center items-center flex-col p-4 border shadow-md rounded-2xl w-[600px]">
				<h1 className="font-bold text-2xl self-start">
					<CgProfile className="inline mb-1 mr-1" /> My Profile
				</h1>
				<div className="flex flex-col gap-3 py-10 text-sm w-full">
					<img
						src={user?.photoURL ? user?.photoURL : undefined}
						className="w-14 h-14 rounded-full"
						alt=""
					/>
					<p className="font-bold">{user?.displayName}</p>
					<p className="text-muted-foreground text-xs">
						@<strong>{user?.uid}</strong>
					</p>
					<div className="py-2 flex justify-center items-center flex-col w-full gap-2">
						<div className="w-full flex justify-between items-center">
							<p>Name</p>
							<p className="font-light">{user?.displayName}</p>
						</div>
						<hr className="w-full" />
						<div className="w-full flex justify-between items-center">
							<p>Email</p>
							<p className="font-light">
								<>{user?.email}</>
							</p>
						</div>
						<hr className="w-full" />
						<div
							className={`w-full flex justify-between items-center 
							`}>
							<p>Speciality</p>
							<p className="font-light">
								<>{currentTUser?.grade}</>
							</p>
						</div>
						{average !== "N/A" && (
							<>
								<hr className="w-full" />
								<div
									className={`w-full flex justify-between items-center 
								${
									+average >= 9
										? "text-green-600"
										: +average >= 7.5
										? "text-green-400"
										: +average >= 6
										? "text-yellow-500"
										: "text-red-500"
								}`}>
									<p>Your Rating</p>
									<p className="">
										<>
											{average} | {currentTUser?.rates?.length}
										</>
									</p>
								</div>
							</>
						)}
						{currentTUser?.HaveCrushOnYou && (
							<>
								<hr className="w-full" />
								<div
									className={`w-full flex justify-between items-center 
								${
									currentTUser?.HaveCrushOnYou.length >= 4
										? "text-red-700"
										: currentTUser?.HaveCrushOnYou.length >= 2
										? "text-red-500"
										: currentTUser?.HaveCrushOnYou.length >= 1
										? "text-red-400"
										: ""
								}
								`}>
									<p>Have Crush On You</p>
									<p className="">
										<>{currentTUser?.HaveCrushOnYou.length}</>
									</p>
								</div>
							</>
						)}
					</div>
				</div>
				<div>
					<Button
						variant={"destructive"}
						onClick={() => {
							handleLogout();
						}}>
						Log out
					</Button>
				</div>
			</div>
		</main>
	);
}

export default Profile;

"use client";

import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app, db } from "@/config/firebase";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CgProfile } from "react-icons/cg";
import ChangePFP from "@/components/ChangePFP";
import DeleteAccount from "@/components/DeleteAccount";
import React from "react";
import { TUser } from "@/lib/firestore";
import isAuth from "@/components/IsAuth";
import { useRouter } from "next/navigation";

function Profile({ userId }: { userId: string }) {
	const [user, setUser] = useState<User | undefined>(undefined);
	const [currentTUser, setCurrentTUser] = useState<TUser | null>(null);
	const router = useRouter();
	useEffect(() => {
		if (user?.uid !== userId) {
			router.push("/profile/" + user?.uid);
		}
	}, [user]);

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
	}, [user]);
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
	}, [user, collectionRef]);
	const validRates =
		currentTUser?.rates?.filter((rate) => typeof rate === "number") ?? [];
	const average =
		validRates.length > 0
			? (validRates.reduce((a, b) => a + b, 0) / validRates.length).toFixed(1)
			: "N/A";
	const auth = getAuth(app);
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

	//

	//
	return (
		<main className="container mx-auto flex justify-center items-center h-[90vh]">
			<div className="flex justify-center items-center flex-col p-4 lg:border lg:shadow-md lg:rounded-2xl md:w-[600px] w-full">
				<h1 className="font-bold text-2xl self-start">
					<CgProfile className="inline mb-1 mr-1" /> My Profile
				</h1>
				<div className="flex flex-col gap-3 py-10 text-sm w-full">
					<img
						src={currentTUser?.imgsrc ? currentTUser.imgsrc : "/anon.png"}
						className="max-w-32 max-h-32 aspect-square rounded-full object-cover" // Add object-cover to your class list
						alt=""
					/>
					<div className="font-bold flex justify-start items-center gap-2">
						<h2 className="text-xl lg:text-2xl">{user?.displayName}</h2>
						{currentTUser?.verified && (
							<img src="/verified.png" alt="" className="w-4" />
						)}
					</div>
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
										: +average >= 6.5
										? "text-green-400"
										: +average >= 5
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
				<div className="flex flex-wrap justify-between items-center gap-4">
					<div className="flex-1">
						<ChangePFP />
					</div>
					<Button
						variant={"destructive"}
						onClick={() => {
							handleLogout();
						}}>
						Log out
					</Button>
					<DeleteAccount />
				</div>
			</div>
		</main>
	);
}

export default isAuth(Profile);

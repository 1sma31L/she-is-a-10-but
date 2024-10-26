"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { CiStar } from "react-icons/ci";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import ProfileDropDownMenu from "@/components/ProfileDropDownMenu";
import { TUser } from "@/lib/firestore";
import { User } from "firebase/auth";
import { db } from "@/config/firebase";

function NavBar({ user }: { user?: User | undefined }) {
	const collectionRef = collection(db, "users");

	const [currentTUser, setCurrentTUser] = useState<TUser | null>(null);
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
	return (
		<header className="container mx-auto px-1">
			<nav className="flex justify-between gap-10 py-4">
				<div className="w-8"></div>
				<div>
					<Button variant={"link"}>
						<Link href={"/hot"} className="hover:underline font-bold">
							Hot <FaFire className="inline mb-1 ml-1" />
						</Link>
					</Button>
					|
					<Button variant={"link"}>
						<Link href={"/rate"} className="hover:underline font-bold">
							Rate <CiStar className="inline mb-1 ml-1" />
						</Link>
					</Button>
				</div>
				<ProfileDropDownMenu imgsrc={currentTUser?.imgsrc ?? ""} />
				{/* <Button variant={"link"}>
					<Link href={`/profile/${user?.uid}`} className="hover:underline">
						<img
							src={user?.photoURL ?? ""}
							className="w-8 rounded-full"
							alt="pfp"
						/>
					</Link>
				</Button> */}
			</nav>
		</header>
	);
}

export default NavBar;

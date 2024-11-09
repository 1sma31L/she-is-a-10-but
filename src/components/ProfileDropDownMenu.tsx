"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { app } from "@/config/firebase";
import { useRouter } from "next/navigation";

export default function DropdownMenuDemo({ imgsrc }: { imgsrc: string }) {
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
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{imgsrc ? (
					<img
						src={imgsrc}
						className="w-8 h-8 rounded-full object-cover cursor-pointer"
						alt=""
					/>
				) : (
					<Button variant={"link"}>Profile</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link href={`/profile/${user?.uid}`}>Profile</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<p className="text-red-500" onClick={handleLogout}>
						Log out
					</p>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

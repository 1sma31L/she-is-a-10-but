"use client";

import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import React from "react";
import { app } from "@/config/firebase";

function Profile() {
	const [user, setUser] = useState<User | undefined>(undefined);

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

	return (
		<main className="container mx-auto">
			<h1 className="font-bold text-4xl">Profile</h1>
			<div className="flex flex-col gap-2 py-10">
				<p>
					Name: <strong>{user?.displayName}</strong>
				</p>
				<p>
					Email: <strong>{user?.email} </strong>
				</p>
			</div>
		</main>
	);
}

export default Profile;

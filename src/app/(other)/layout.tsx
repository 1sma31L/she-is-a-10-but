"use client";

import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import NavBar from "@/components/NavBar";
import { app } from "@/config/firebase";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
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
		<>
			<NavBar user={user} />
			{children}
		</>
	);
}

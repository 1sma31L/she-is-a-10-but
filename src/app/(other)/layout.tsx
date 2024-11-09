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
				setUser(user);
			} else {
				setUser(undefined);
			}
		});

		return () => unsubscribe();
	}, []);

	return (
		<>
			<NavBar user={user} />
			{children}
		</>
	);
}

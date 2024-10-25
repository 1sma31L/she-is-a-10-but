"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { redirect } from "next/navigation";

const auth = getAuth();

export default function withAuth(WrappedComponent: any) {
	return function WithAuth(props: any) {
		const [session, setSession] = useState<boolean | null>(null); // Use local state

		useEffect(() => {
			const unsubscribe = onAuthStateChanged(auth, (user) => {
				if (user) {
					setSession(true); // User is authenticated
				} else {
					setSession(false); // User is not authenticated
					redirect("/login"); // Redirect if not authenticated
				}
			});

			return () => unsubscribe(); // Clean up the listener on unmount
		}, []);

		// While checking the auth state, you may want to show a loading state
		if (session === null) {
			return <div></div>; // or any loading component
		}

		// Render the wrapped component only if authenticated
		return session ? <WrappedComponent {...props} /> : null;
	};
}

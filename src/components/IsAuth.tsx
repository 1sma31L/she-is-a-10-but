"use client";

import { isUserAuthenticated } from "@/lib/Auth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(WrappedComponent: any) {
	return function WithAuth(props: any) {
		const session = isUserAuthenticated;
		useEffect(() => {
			if (!session) {
				redirect("/");
			}
		}, []);

		if (!session) {
			return null;
		}
		return <WrappedComponent {...props} />;
	};
}

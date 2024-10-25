"use client";

import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isUserAuthenticated } from "@/lib/Auth";
import { useRouter } from "next/navigation";

function Main() {
	const router = useRouter();
	const auth = isUserAuthenticated;
	useEffect(() => {
		if (!!auth) {
			router.push("/rate");
		} else router.push("/");
	}, []);
	return (
		<main className="conatiner mx-auto h-screen flex justify-center items-center flex-col gap-5">
			<h1 className="text-3xl md:text-5xl font-bold">
				She&apos;s a 10 but ...
			</h1>
			<Button>
				<Link href={"/login"}>Login</Link>
			</Button>
		</main>
	);
}

export default Main;

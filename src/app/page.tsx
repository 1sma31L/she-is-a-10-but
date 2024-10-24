import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function Main() {
	return (
		<main className="conatiner mx-auto h-screen flex justify-center items-center flex-col gap-5">
			<h1 className="text-3xl md:text-5xl font-bold">She's a 10 but ...</h1>
			<Button>
				<Link href={"/login"}>Login</Link>
			</Button>
		</main>
	);
}

export default Main;

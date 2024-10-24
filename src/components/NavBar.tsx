import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function NavBar() {
	return (
		<header>
			<nav className="mx-auto w-full flex justify-center gap-10 p-4">
				<Button variant={"link"}>
					<Link href={"/hot"} className="hover:underline">
						Hot
					</Link>
				</Button>
				<Button variant={"link"}>
					<Link href={"/rate"} className="hover:underline">
						Rate
					</Link>
				</Button>
			</nav>
		</header>
	);
}

export default NavBar;

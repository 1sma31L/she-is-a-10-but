import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfileDropDownMenu from "@/components/ProfileDropDownMenu";
import React from "react";
import { User } from "firebase/auth";
function NavBar({ user }: { user?: User | undefined }) {
	return (
		<header className="container mx-auto">
			<nav className="flex justify-between gap-10 py-4">
				<div className="w-8"></div>
				<div>
					<Button variant={"link"}>
						<Link href={"/hot"} className="hover:underline font-bold">
							Hot
						</Link>
					</Button>
					<Button variant={"link"}>
						<Link href={"/rate"} className="hover:underline font-bold">
							Rate
						</Link>
					</Button>
				</div>
				<ProfileDropDownMenu imgsrc={user?.photoURL ?? ""} />
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

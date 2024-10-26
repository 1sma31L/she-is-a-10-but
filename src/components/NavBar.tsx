import { Button } from "@/components/ui/button";
import { CiStar } from "react-icons/ci";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import ProfileDropDownMenu from "@/components/ProfileDropDownMenu";
import React from "react";
import { User } from "firebase/auth";
function NavBar({ user }: { user?: User | undefined }) {
	return (
		<header className="container mx-auto px-1">
			<nav className="flex justify-between gap-10 py-4">
				<div className="w-8"></div>
				<div>
					<Button variant={"link"}>
						<Link href={"/hot"} className="hover:underline font-bold">
							Hot <FaFire className="inline mb-1 ml-1" />
						</Link>
					</Button>
					|
					<Button variant={"link"}>
						<Link href={"/rate"} className="hover:underline font-bold">
							Rate <CiStar className="inline mb-1 ml-1" />
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

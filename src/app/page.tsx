"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CiStar } from "react-icons/ci";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

function Main() {
	const [session, setSession] = useState<boolean | null>(null);
	const router = useRouter();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setSession(true);
				router.push("/hot");
			} else {
				setSession(false);
			}
		});

		return () => unsubscribe();
	}, []);

	if (session === null) {
		return <div></div>;
	}
	return (
		<main className="conatiner mx-auto h-screen flex justify-center items-center flex-col gap-5">
			<div className="flex flex-col gap-5 w-[300px] lg:w-[500px]">
				<h1 className="text-lg lg:text-xl max-w-full font-bold">
					Were we let for our Looks? No. ^_^ <br />
					Will we be Judged on them? Yes. &gt;_&lt;
				</h1>
				<div className="flex flex-col gap-2 w-full">
					<Button asChild>
						<Link href={"/login"}>Login</Link>
					</Button>
					<div className="flex gap-2 w-full">
						<Button variant={"secondary"} className="flex-1">
							<Link
								href={"/hot"}
								className="flex gap-2 justify-center items-center">
								Hot <FaFire />
							</Link>
						</Button>

						<Button variant={"secondary"} className="flex-1">
							<Link
								href={"/rate"}
								className="flex gap-2 justify-center items-center">
								Rate <CiStar />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Main;

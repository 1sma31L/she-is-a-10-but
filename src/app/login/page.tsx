import { Button } from "@/components/ui/button";
import React from "react";

function Home() {
	return (
		<main className="container mx-auto flex justify-center items-center h-screen">
			<div className="flex flex-col justify-center items-center gap-3">
				<Button>Login using Google</Button>
				<div className="text-xs text-muted-foreground">
					<ul className="flex flex-col gap-1">
						<li>
							- Only <strong>CP1/CP2</strong> are allowed to acces this website.
						</li>
						<li>
							- You have to use the Gmail provided by the{" "}
							<strong>school</strong>.
						</li>
					</ul>
				</div>
			</div>
		</main>
	);
}

export default Home;

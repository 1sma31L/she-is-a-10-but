"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Slider from "@/components/Slider";
import { useState } from "react";

export default function CardWithForm() {
	const [rating, setRating] = useState([5]);
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Rate</CardTitle>
				<CardDescription>Rate this person on 10.</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col justify-center gap-5">
				<h1 className="">BOUSSEKINE M. Ismail</h1>
				<Slider
					onValueChange={(value) => {
						setRating(value);
					}}
				/>
				<div className="w-full ">
					<p
						className={`text-center w-fit font-bold border-2 mx-auto px-2 rounded-sm ${
							rating[0] === 1
								? "bg-red-900"
								: rating[0] === 2
								? "bg-red-800"
								: rating[0] === 3
								? "bg-red-500"
								: rating[0] === 4
								? "bg-red-400"
								: rating[0] === 5
								? "bg-yellow-600"
								: rating[0] === 6
								? "bg-yellow-500"
								: rating[0] === 7
								? "bg-yellow-400"
								: rating[0] === 8
								? "bg-green-400"
								: rating[0] === 9
								? "bg-green-500"
								: rating[0] === 10
								? "bg-green-600"
								: ""
						}
             text-white`}>
						{rating}
					</p>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button>Rate</Button>
				<Button variant={"secondary"}>IDK Him/Her</Button>
			</CardFooter>
		</Card>
	);
}

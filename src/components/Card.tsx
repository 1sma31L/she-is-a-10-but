"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Users, getRatedUsers } from "@/lib/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Slider from "@/components/Slider";
import { TUser } from "@/lib/firestore";
import { User } from "firebase/auth";
import { app } from "@/config/firebase";

export default function CardWithForm() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [rating, setRating] = useState([5]);
	const [ratedUsers, setRatedUsers] = useState<string[]>([]);
	// ================
	const [users, setUsers] = useState<TUser[] | null>(null); // List of the users that will be rendered
	// ================
	const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

	const handleRate = () => {
		setRating([5]);
		nextUser();
	};

	const handleSkip = () => {
		nextUser();
	};

	const nextUser = () => {
		setCurrentIndex((prevIndex) => {
			if (users && prevIndex < users.length) {
				return prevIndex + 1; // Move to the next user
			}
			return prevIndex; // Stay on the last user if reached the end
		});
		console.log(users);
	};

	const currentUserByIndex = users ? users[currentIndex] : null;

	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser(user); // Set user ID when user is signed in
			} else {
				setCurrentUser(undefined); // Reset user ID when no user is signed in
			}
		});

		return () => unsubscribe(); // Clean up the subscription on unmount
	}, []);

	useEffect(() => {
		if (currentUser?.uid) {
			getRatedUsers(currentUser.uid, "peopleRated").then(
				(peopleRated: string[] | null) => {
					if (peopleRated) {
						setRatedUsers(peopleRated);
					}
				}
			);
		}
	}, [currentUser]);

	useEffect(() => {
		const unratedUsers = Users?.filter((user) => {
			return !ratedUsers.includes(user.email);
		});
		if (unratedUsers !== undefined) {
			setUsers(unratedUsers.sort(() => Math.random() - 0.5));
		}
	}, []);

	return currentUserByIndex ? (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Rate</CardTitle>
				<CardDescription>Rate this person on 10.</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col justify-center gap-5">
				<h1 className="">{currentUserByIndex?.name}</h1>
				<Slider
					onValueChange={(value) => {
						setRating(value);
					}}
					value={rating}
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
				<Button onClick={handleRate}>Rate</Button>
				<Button variant={"secondary"} onClick={handleSkip}>
					Skip{" "}
				</Button>
			</CardFooter>
		</Card>
	) : (
		<div>Thats all for today</div>
	);
}

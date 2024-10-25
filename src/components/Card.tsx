"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { app, db } from "@/config/firebase";
import {
	arrayUnion,
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { getAllUsers, getRatedUsers } from "@/lib/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa6";
import Slider from "@/components/Slider";
import { TUser } from "@/lib/firestore";
import { User } from "firebase/auth";

export default function CardWithForm() {
	//
	const [alreadyHasCrush, setAlreadyHasCrush] = useState(false);
	const [isCrush, setIsCrush] = useState(false);
	useEffect(() => {
		users?.forEach((user) => {
			user.email === currentUser?.email &&
				user.youHaveCrushOn !== null &&
				setAlreadyHasCrush(true);
		});
	}, []);
	//
	const [isLoading, setIsLoading] = useState(false);
	const collectionRef = collection(db, "users");
	const [currentIndex, setCurrentIndex] = useState(0);
	const [rating, setRating] = useState([5]);
	const [ratedUsers, setRatedUsers] = useState<string[]>([]);
	const [users, setUsers] = useState<TUser[] | null>(null);
	const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
	const currentUserByIndex = users ? users[currentIndex] : null;
	const [UIDofCurrentUserByIndex, setUIDofCurrentUserByIndex] = useState<
		string | undefined
	>(undefined);
	useEffect(() => {
		if (currentUserByIndex) {
			const fetchUID = async () => {
				const snapshot = await getDocs(
					query(collectionRef, where("email", "==", currentUserByIndex.email))
				);
				const uid = snapshot.docs[0]?.id;
				setUIDofCurrentUserByIndex(uid);
			};
			fetchUID();
		}
	}, [currentUserByIndex]);
	const handleRate = async () => {
		if (currentUser && UIDofCurrentUserByIndex) {
			const currentUserRef = doc(db, "users", currentUser?.uid);
			const currentUserByIndexRef = doc(db, "users", UIDofCurrentUserByIndex);
			await updateDoc(currentUserRef, {
				peopleRated: arrayUnion(currentUserByIndex?.email),
				youHaveCrushOn: isCrush ? currentUserByIndex?.email : null,
			});
			await updateDoc(currentUserByIndexRef, {
				HaveCrushOnYou: isCrush ? arrayUnion(currentUser?.email) : null,
				rates: arrayUnion(rating[0]),
			});
		}
		setIsCrush(false);
		isCrush && setAlreadyHasCrush(true);
		setRating([5]);
		nextUser();
	};

	const handleSkip = () => {
		setRating([5]);
		nextUser();
	};

	const nextUser = () => {
		setCurrentIndex((prevIndex) => {
			if (users && prevIndex < users.length) {
				return prevIndex + 1;
			}
			return prevIndex;
		});
		console.log(users);
	};

	useEffect(() => {
		const auth = getAuth(app);
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setCurrentUser(user);
			} else {
				setCurrentUser(undefined);
			}
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (currentUser?.uid) {
			getRatedUsers(currentUser.uid, "peopleRated").then(
				(peopleRated: string[] | null) => {
					if (peopleRated) {
						setRatedUsers(peopleRated);
					} else {
						setRatedUsers([]);
					}
				}
			);
		}
	}, [currentUser]);

	useEffect(() => {
		const fetchUsers = async () => {
			if (currentUser?.email) {
				const Users = await getAllUsers(currentUser.email);
				console.log("******* All Users:", Users);

				if (Users) {
					const unratedUsers = Users.filter(
						(user) => !ratedUsers.includes(user.email)
					);

					console.log("******* Unrated Users:", unratedUsers);

					// Shuffle and set the unrated users
					setUsers(unratedUsers.sort(() => Math.random() - 0.5));
				} else {
					setUsers([]);
				}
			}
			setIsLoading(false);
		};

		// Ensure ratedUsers is available before fetching
		if (ratedUsers.length > 0 || ratedUsers !== null) {
			setIsLoading(true); // Start loading before fetching

			fetchUsers();
		}
	}, [currentUser, ratedUsers]);
	if (isLoading) {
		return <div>^_^</div>; // Show loading indicator
	}
	return currentUserByIndex ? (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Rate</CardTitle>
				<CardDescription>Rate this person on 10.</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col justify-center gap-5">
				<img
					src={
						currentUserByIndex.imgsrc ? currentUserByIndex.imgsrc : "/anon.png"
					}
					alt="Profile Picture"
					className="w-20 rounded-full mx-auto"
				/>
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
			<CardFooter className="flex justify-between flex-col items-center gap-4">
				<div className="flex justify-between w-full items-center">
					<Button onClick={handleRate}>Rate</Button>
					{!alreadyHasCrush && (
						<FaHeart
							className={`text-3xl transition-all duration-1000 ${
								isCrush ? "text-red-500" : "text-gray-300"
							}`}
							onClick={() => {
								setIsCrush((prev) => !prev);
							}}
						/>
					)}
					<Button variant={"secondary"} onClick={handleSkip}>
						Skip{" "}
					</Button>
				</div>
				{!alreadyHasCrush && (
					<p className="text-xs">
						*Heart emoji is used to choose your crush, you got only one time,
						Choose it WISELY.
					</p>
				)}
			</CardFooter>
		</Card>
	) : (
		<div>Thats all for today!.</div>
	);
}

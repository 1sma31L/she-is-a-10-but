import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

import React from "react";
import Skeleton from "../Skeleton";
import { motion } from "framer-motion";

function CardSkeleton() {
	return (
		<Card className="w-[320px]  lg:w-[400px] animate-pulse">
			<CardHeader>
				<Skeleton className="h-4 w-24 rounded-md mb-2" /> {/* Title */}
				<Skeleton className="h-3 w-40 rounded-md" /> {/* Description */}
			</CardHeader>

			<CardContent className="flex flex-col justify-center gap-4">
				<Skeleton className="w-20 h-20 rounded-full mx-auto" />{" "}
				{/* Profile Picture */}
				<div className="flex justify-center items-center gap-2">
					<Skeleton className="h-5 w-32 rounded-md" /> {/* Name */}
					<Skeleton className="h-4 w-4 rounded-full" /> {/* Verified badge */}
				</div>
				<Skeleton className="w-full h-3 rounded-md mt-1" /> {/* Slider */}
				<Skeleton className="h-8 w-8 mx-auto mt-2 rounded-sm" />{" "}
				{/* Rating display */}
			</CardContent>

			<CardFooter className="flex justify-between flex-col items-center gap-3">
				<div className="flex justify-between w-full items-center">
					<Skeleton className="h-8 w-16 rounded-md" /> {/* Rate Button */}
					<Skeleton className="h-8 w-8 rounded-full" /> {/* Heart icon */}
					<Skeleton className="h-8 w-16 rounded-md" /> {/* Skip Button */}
				</div>
				<Skeleton className="h-8 w-64 mt-2 rounded-md" />{" "}
				{/* Crush warning message */}
			</CardFooter>
		</Card>
	);
}

export default CardSkeleton;

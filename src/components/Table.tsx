"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

import { TUser } from "@/lib/firestore";
import TableSkeleton from "@/components/Skeletons/Table";
import { motion } from "framer-motion";

export default function TableDemo({ students }: { students: TUser[] | null }) {
	const [loading, setLoading] = useState(true);

	// Simulate data fetching delay (you can remove this in real usage)
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 400); // 2s delay
		return () => clearTimeout(timer);
	}, []);

	if (loading) return <TableSkeleton />;
	return (
		<motion.div
			key={"table"}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}>
			<Table className="table-fixed w-full">
				<TableCaption>Students Rating Table</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-1/2 text-xs">Name</TableHead>
						<TableHead className="w-1/6 text-xs">Sex</TableHead>
						<TableHead className="w-1/6 text-xs">Spec</TableHead>
						<TableHead className="w-1/6 text-xs">No. Crush</TableHead>
						<TableHead className="w-1/5 text-xs">Rating</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{students?.map((student) => {
						const validRates =
							student.rates?.filter((rate) => typeof rate === "number") ?? [];
						const average =
							validRates.length > 0
								? (
										validRates.reduce((a, b) => a + b, 0) / validRates.length
								  ).toFixed(1)
								: "N/A";

						return (
							<TableRow key={student.name + student.email}>
								<TableCell className="w-1/5 text-xs">{student.name}</TableCell>
								<TableCell className="w-1/6 text-xs">
									{student.gender === "male"
										? "M"
										: student.gender === "female"
										? "F"
										: "Gay"}
								</TableCell>
								<TableCell className="w-1/6 text-xs">
									{student.grade ?? "N/A"}
								</TableCell>
								<TableCell className="w-1/6 text-xs">
									{student.HaveCrushOnYou?.length || 0}
								</TableCell>
								<TableCell className="w-1/5 text-xs">{average}</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</motion.div>
	);
}

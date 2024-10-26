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

export default function TableDemo({ students }: { students: TUser[] | null }) {
	const [loading, setLoading] = useState(true);

	// Simulate data fetching delay (you can remove this in real usage)
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 400); // 2s delay
		return () => clearTimeout(timer);
	}, []);

	if (loading) return <TableSkeleton />;
	return (
		<Table className="table-fixed w-full">
			<TableCaption>Students Rating Table</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-1/2">Name</TableHead>
					<TableHead className="w-1/6">Sex</TableHead>
					<TableHead className="w-1/6">Speciality</TableHead>
					<TableHead className="w-1/6">Have Crush On</TableHead>
					<TableHead className="w-1/5">Rating</TableHead>
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
							<TableCell className="w-1/5">{student.name}</TableCell>
							<TableCell className="w-1/6">
								{student.gender === "male"
									? "M"
									: student.gender === "female"
									? "F"
									: "Gay"}
							</TableCell>
							<TableCell className="w-1/6">{student.grade ?? "N/A"}</TableCell>
							<TableCell className="w-1/6">
								{student.HaveCrushOnYou?.length || 0}
							</TableCell>
							<TableCell className="w-1/5">{average}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

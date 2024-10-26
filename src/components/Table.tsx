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
		const timer = setTimeout(() => setLoading(false), 400); // 0.4s delay
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
			<Table className="table-fixed w-full mb-5">
				<TableCaption>Students Rating Table</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-1/12 text-xs">#</TableHead>
						<TableHead className="w-1/3 text-xs">Name</TableHead>
						<TableHead className="w-1/6 text-xs">Sex</TableHead>
						<TableHead className="w-1/6 text-xs">Spec</TableHead>
						<TableHead className="w-1/6 text-xs">No. Crush</TableHead>
						<TableHead className="w-1/5 text-xs">Rating</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{students?.map((student, index) => {
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
								<TableCell className="w-1/12 text-[10px] md:text-xs lg:text-sm">
									{index + 1}
								</TableCell>
								<TableCell className="w-1/3 text-[10px] md:text-xs lg:text-sm">
									<div className="flex justify-start items-center gap-2">
										<img
											src={student.imgsrc ?? "/anon.png"}
											className="w-8 h-8 rounded-full object-cover"
											alt=""
										/>
										<p>{student.name}</p>
										{student?.verified && (
											<img src="/verified.png" alt="" className="w-3" />
										)}
									</div>
								</TableCell>
								<TableCell className="w-1/6 text-[10px] md:text-xs lg:text-sm">
									{student.gender === "male"
										? "M"
										: student.gender === "female"
										? "F"
										: "N/A"}
								</TableCell>
								<TableCell className="w-1/6 text-[10px] md:text-xs lg:text-sm">
									{student.grade ?? "N/A"}
								</TableCell>
								<TableCell className="w-1/6 text-[10px] md:text-xs lg:text-sm">
									{student.HaveCrushOnYou?.length || 0}
								</TableCell>
								<TableCell className="w-1/5 text-[10px] md:text-xs lg:text-sm">
									{average} | {student.rates?.length}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</motion.div>
	);
}

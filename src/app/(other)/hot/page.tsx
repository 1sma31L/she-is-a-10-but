"use client";

import { useEffect, useState } from "react";

import { TUser } from "@/lib/firestore";
import Table from "@/components/Table";
import { getAllUsers } from "@/lib/firestore";
import isAuth from "@/components/IsAuth";

function calculateAverage(rates: number[] | null): number {
	if (!rates || rates.length === 0) return 0;
	const sum = rates.reduce((acc, rate) => acc + rate, 0);
	return sum / rates.length;
}
function Hot() {
	const [students, setStudents] = useState<TUser[] | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			const Users = await getAllUsers("");
			setStudents(
				Array.isArray(Users)
					? Users.sort((a, b) => {
							const avgA = calculateAverage(a.rates);
							const avgB = calculateAverage(b.rates);
							return avgB - avgA;
					  })
					: []
			);
		};
		fetchUsers();
	}, []);

	return (
		<main className="container mx-auto">
			<Table students={students} />
		</main>
	);
}
export default isAuth(Hot);

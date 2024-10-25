"use client";

import { useEffect, useState } from "react";

import Table from "@/components/Table";
import { User } from "@/lib/firestore";
import { Users } from "@/lib/firestore";
import isAuth from "@/components/IsAuth";

function Hot() {
	const [students, setStudents] = useState<User[] | null>(null);

	useEffect(() => {
		setStudents(Array.isArray(Users) ? Users : []);
	}, []);

	return (
		<main className="container mx-auto">
			<Table students={students} />
		</main>
	);
}
export default isAuth(Hot);

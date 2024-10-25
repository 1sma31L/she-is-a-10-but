"use client";

import Table from "@/components/Table";
import isAuth from "@/components/IsAuth";
function Hot() {
	return (
		<main className="container mx-auto">
			<Table />
		</main>
	);
}
export default isAuth(Hot);

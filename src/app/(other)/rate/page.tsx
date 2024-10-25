"use client";

import Card from "@/components/Card";
import React from "react";
import isAuth from "@/components/IsAuth";
function Rate() {
	return (
		<main className="container mx-auto flex justify-center items-center h-[60vh]">
			<Card />
		</main>
	);
}

export default isAuth(Rate);

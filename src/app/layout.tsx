import "./globals.css";

import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import localFont from "next/font/local";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "She's A 20 but ...",
	description: "Rete students of ENSTA",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased px-3`}>
				{children}
			</body>
		</html>
	);
}
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { doc, setDoc, updateDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { db } from "@/config/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DialogDemo({ userId }: { userId: string }) {
	const router = useRouter();
	const [gender, setGender] = useState<"male" | "female">("male");
	const handleClick = async () => {
		const userDocRef = doc(db, "users", userId);
		await updateDoc(userDocRef, {
			gender,
		});
		router.push("/rate");
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Choose Gender</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Choose Gender</DialogTitle>
					<DialogDescription className="flex flex-col gap-5">
						<span>
							Let us know your gender in order to be able to rate the other
							gender.
						</span>
					</DialogDescription>
				</DialogHeader>
				<RadioGroup
					value={gender}
					onValueChange={(value: string) =>
						setGender(value as "male" | "female")
					}>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="male" id="male" />
						<Label htmlFor="male">Male</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="female" id="female" />
						<Label htmlFor="female">Female</Label>
					</div>
					<div>
						<p>
							You chose: <strong className="capitalize">{gender}</strong>
						</p>
					</div>
				</RadioGroup>
				<DialogClose asChild>
					<Button onClick={handleClick}>Save changes</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}

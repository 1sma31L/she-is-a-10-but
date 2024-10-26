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
import { doc, updateDoc } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { db } from "@/config/firebase";
import { specialities } from "@/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DialogDemo({ userId }: { userId: string }) {
	const router = useRouter();
	const [gender, setGender] = useState<"male" | "female">("male");
	const [grade, setGrade] = useState<string | undefined>("CP2");
	const handleClick = async () => {
		const userDocRef = doc(db, "users", userId);
		await updateDoc(userDocRef, {
			gender,
			grade,
		});
		router.push("/rate");
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Tell us more</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Choose Gender</DialogTitle>
					<DialogDescription className="flex flex-col gap-5">
						<span>Let us know your gender and speciality.</span>
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
				<RadioGroup
					value={grade}
					onValueChange={(value: string) => setGrade(value)}>
					{specialities.map((spec) => {
						return (
							<div className="flex items-center space-x-2" key={spec}>
								<RadioGroupItem value={spec} id={spec} />
								<Label htmlFor={spec}>{spec}</Label>
							</div>
						);
					})}
					<div>
						<p>
							You chose: <strong className="capitalize">{grade}</strong>
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

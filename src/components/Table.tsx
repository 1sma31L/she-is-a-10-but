import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { TUser } from "@/lib/firestore";

export default function TableDemo({ students }: { students: TUser[] | null }) {
	return (
		<Table>
			<TableCaption>Students Rating Table</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Name</TableHead>
					<TableHead>Sex</TableHead>
					<TableHead>Grade</TableHead>
					<TableHead>Have Crush On</TableHead>
					<TableHead>Rating</TableHead>
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
							<TableCell>{student.name}</TableCell>
							<TableCell>
								{student.gender === "male"
									? "M"
									: student.gender === "female"
									? "F"
									: "Gay"}
							</TableCell>
							<TableCell>{student.grade ?? "N/A"}</TableCell>
							<TableCell>{student.HaveCrushOnYou?.length || 0}</TableCell>
							<TableCell>{average}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

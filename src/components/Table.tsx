import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { User } from "@/lib/firestore";

export default function TableDemo({ students }: { students: User[] | null }) {
	return (
		<Table>
			<TableCaption>Students Rating Table</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="">Name</TableHead>
					<TableHead>Grade</TableHead>
					<TableHead className="">Rating</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{students?.map((student) => {
					const average = student.rates
						? student.rates.reduce((a, b) => a + b, 0) / student.rates.length
						: 0;
					console.log(average);
					return (
						<TableRow key={student.name + student.email}>
							<TableCell className="">{student.name}</TableCell>
							<TableCell>{student.grade ? student.grade : "N/A"}</TableCell>
							<TableCell className="">{average ? average : "N/A"}</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}

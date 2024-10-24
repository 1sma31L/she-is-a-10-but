import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const students = [
	{
		name: "BOUSSEKINE Mohamed Ismail",
		grade: "CP2",
		rate: "10",
	},
	{
		name: "FERKIOUI Akram",
		grade: "CP2",
		rate: "10",
	},
];

export default function TableDemo() {
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
				{students.map((student) => (
					<TableRow key={student.name}>
						<TableCell className="">{student.name}</TableCell>
						<TableCell>{student.grade}</TableCell>
						<TableCell className="">{student.rate}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

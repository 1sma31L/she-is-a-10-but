import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import Skeleton from "@/components/Skeleton";

export default function TableSkeleton() {
	return (
		<Table className="table-fixed w-full">
			<TableCaption>Loading Students Rating Table...</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-1/2">Name</TableHead>
					<TableHead className="w-1/6">Sex</TableHead>
					<TableHead className="w-1/6">Speciality</TableHead>
					<TableHead className="w-1/6">Have Crush On</TableHead>
					<TableHead className="w-1/5">Rating</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.from({ length: 5 }).map((_, index) => (
					<TableRow key={index}>
						<TableCell className="w-1/5">
							<Skeleton className="h-3 w-[300px]" />
						</TableCell>
						<TableCell className="w-1/6">
							<Skeleton className="h-3 w-[20px]" />
						</TableCell>
						<TableCell className="w-1/6">
							<Skeleton className="h-3 w-[40px]" />
						</TableCell>
						<TableCell className="w-1/6">
							<Skeleton className="h-3 w-[20px]" />
						</TableCell>
						<TableCell className="w-1/5">
							<Skeleton className="h-3 w-[40px]" />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

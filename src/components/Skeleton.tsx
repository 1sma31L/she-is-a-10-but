function Skeleton({ className }: { className?: string }) {
	return (
		<div className={`bg-gray-300 animate-pulse rounded-md ${className} `} />
	);
}

export default Skeleton;

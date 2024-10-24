import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

type SliderProps = React.ComponentProps<typeof Slider>;

export default function SliderDemo({ className, ...props }: SliderProps) {
	return (
		<Slider
			defaultValue={[5]}
			max={10}
			min={1}
			step={1}
			className={cn("w-full", className)}
			{...props}
		/>
	);
}

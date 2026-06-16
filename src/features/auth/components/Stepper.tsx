import { Separator } from "@/components/ui/separator.tsx";

interface StepperProps {
	currentStep: number;
}

function Stepper({ currentStep }: StepperProps) {
	return (
		<div className="mx-auto flex gap-4">
			<span
				className={`px-2 py-1 ${currentStep >= 0 ? "border-b-primary border-b-2" : ""}`}
			>
				Account Details
			</span>

			<Separator orientation={"vertical"} />

			<span
				className={`px-2 py-1 ${currentStep >= 1 ? "border-b-primary border-b-2" : ""}`}
			>
				Personal Details
			</span>

			<Separator orientation={"vertical"} />

			<span
				className={`px-2 py-1 ${currentStep >= 2 ? "border-b-primary border-b-2" : ""}`}
			>
				Address Details
			</span>
		</div>
	);
}

export default Stepper;

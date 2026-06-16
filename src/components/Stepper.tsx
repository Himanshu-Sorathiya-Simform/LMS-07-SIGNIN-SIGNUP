interface StepperProps {
	currentStep: number;
	maxStep: number;
}

function Stepper({ currentStep, maxStep }: StepperProps) {
	return (
		<div className="flex w-full gap-4">
			{Array.from({ length: maxStep }).map((_, index) => {
				const isActive = currentStep === index;
				const isCompleted = currentStep > index;

				return (
					<div
						key={index}
						className={`h-2 w-full rounded-full transition-colors duration-200 ${
							isActive ? "bg-gray-400"
							: isCompleted ? "bg-primary"
							: "bg-gray-200"
						}`}
					/>
				);
			})}
		</div>
	);
}

export default Stepper;

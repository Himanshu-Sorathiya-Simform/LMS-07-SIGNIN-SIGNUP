import { Separator } from "@/components/ui/separator.tsx";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import AccountDetailsForm from "./components/AccountDetailsForm.tsx";
import AddressDetailsForm from "./components/AddressDetailsForm.tsx";
import PersonalDetailsForm from "./components/PersonalDetailsForm.tsx";

function SignupForm() {
	const [currentStep, setCurrentStep] = useState(() => {
		const savedStep = sessionStorage.getItem("signup_step");

		return savedStep ? Number(savedStep) : 0;
	});

	useEffect(() => {
		sessionStorage.setItem("signup_current_step", currentStep.toString());
	}, [currentStep]);

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold">
				{currentStep === 0 && "Account Detail"}
				{currentStep === 1 && "Personal Detail"}
				{currentStep === 2 && "Address Detail"}
			</h2>

			<Separator />

			{currentStep === 0 && (
				<AccountDetailsForm
					nextStep={() => setCurrentStep((prev) => prev + 1)}
				/>
			)}
			{currentStep === 1 && (
				<PersonalDetailsForm
					nextStep={() => setCurrentStep((prev) => prev + 1)}
					previousStep={() => setCurrentStep((prev) => prev - 1)}
				/>
			)}
			{currentStep === 2 && (
				<AddressDetailsForm
					previousStep={() => setCurrentStep((prev) => prev - 1)}
				/>
			)}

			<Separator />

			{currentStep === 0 && (
				<p className="text-muted-foreground mt-4 text-center text-sm">
					Already a member?{" "}
					<Link
						to="/signin"
						className="text-primary font-medium underline-offset-4 transition-colors hover:underline"
					>
						Sign in here
					</Link>
				</p>
			)}
		</div>
	);
}

export default SignupForm;

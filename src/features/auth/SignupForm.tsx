import { useEffect, useState } from "react";
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
		<>
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
		</>
	);
}

export default SignupForm;

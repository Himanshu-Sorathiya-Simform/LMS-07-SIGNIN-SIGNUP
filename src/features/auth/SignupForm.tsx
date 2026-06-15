import { useState } from "react";
import AccountDetailsForm from "./components/AccountDetailsForm.tsx";
import AddressDetailsForm from "./components/AddressDetailsForm.tsx";
import PersonalDetailsForm from "./components/PersonalDetailsForm.tsx";

function SignupForm() {
	const [currentStep, setCurrentStep] = useState(0);

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

import FormActions from "@/components/FormActions.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { type SignupSchema, signupSchema } from "@/schemas/SignupSchema.ts";
import { getInitialSignupDetails } from "@/utils/sessionStorageUtils.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Stepper from "../../components/Stepper.tsx";
import AccountDetailsForm from "./components/AccountDetailsForm.tsx";
import AddressDetailsForm from "./components/AddressDetailsForm.tsx";
import PersonalDetailsForm from "./components/PersonalDetailsForm.tsx";

const FormSteps: Array<Array<keyof SignupSchema>> = [
	["email", "password", "confirmPassword", "termsAndConditions"],
	["firstName", "lastName", "dateOfBirth", "gender"],
	["city", "landmark", "street", "state", "zip", "country"],
];

function SignupForm() {
	const navigate = useNavigate();

	const [currentStep, setCurrentStep] = useState(0);

	const { control, register, formState, trigger, resetField } =
		useForm<SignupSchema>({
			resolver: zodResolver(signupSchema),
			defaultValues: getInitialSignupDetails(),
		});

	async function nextStep(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		const valid = await trigger(FormSteps[currentStep]);

		if (valid && currentStep === FormSteps.length - 1) {
			navigate("/signin");
		}

		if (valid && currentStep < FormSteps.length - 1) {
			setCurrentStep((prev) => prev + 1);
		}
	}

	async function previousStep(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		if (currentStep > 0) setCurrentStep((prev) => prev - 1);
	}

	function handleReset(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();

		FormSteps[currentStep]?.forEach((field) => resetField(field));
	}

	return (
		<>
			<div className="flex flex-col gap-4 rounded-md p-5 outline-1 outline-gray-300">
				<h2 className="text-2xl font-bold">
					{currentStep === 0 && "Account Details"}
					{currentStep === 1 && "Personal Details"}
					{currentStep === 2 && "Address Details"}
				</h2>

				<Stepper
					currentStep={currentStep}
					maxStep={3}
				/>

				<Separator />

				{currentStep === 0 && (
					<AccountDetailsForm
						register={register}
						formState={formState}
						control={control}
					/>
				)}
				{currentStep === 1 && (
					<PersonalDetailsForm
						register={register}
						formState={formState}
						control={control}
					/>
				)}
				{currentStep === 2 && (
					<AddressDetailsForm
						register={register}
						formState={formState}
					/>
				)}

				<FormActions className={"justify-end"}>
					{currentStep > 0 && (
						<Button
							type="button"
							variant="outline"
							onClick={previousStep}
						>
							Back
						</Button>
					)}

					<Button
						type="button"
						variant="outline"
						className="ml-auto"
						onClick={handleReset}
					>
						<RefreshCcw />
					</Button>

					{currentStep !== FormSteps.length - 1 ?
						<Button
							type="button"
							onClick={nextStep}
						>
							Next
						</Button>
					:	<Button
							type="submit"
							onClick={nextStep}
						>
							Submit
						</Button>
					}
				</FormActions>
			</div>

			<p className="text-muted-foreground mt-4 text-center text-sm">
				Already a member?{" "}
				<Link
					to="/signin"
					className="text-primary font-medium underline-offset-4 transition-colors hover:underline"
				>
					Sign in here
				</Link>
			</p>
		</>
	);
}

export default SignupForm;

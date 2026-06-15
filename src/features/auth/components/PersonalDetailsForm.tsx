import { DateField } from "@/components/fields/DateField.tsx";
import { DropdownField } from "@/components/fields/DropdownField.tsx";
import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import { RotateCcw } from "lucide-react";

function PersonalDetailsForm({
	nextStep,
	previousStep,
}: {
	nextStep: () => void;
	previousStep: () => void;
}) {
	const genderOptions = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
		{ value: "other", label: "Other" },
		{ value: "prefer-not", label: "Prefer not to say" },
	];

	return (
		<FieldGroup>
			<FieldGroup className="grid min-w-sm grid-cols-2">
				<InputField
					id={"input-field-first-name"}
					label={"First Name"}
					className="focus-visible:ring-1"
					placeholder={"Enter your first name"}
					required
				/>

				<InputField
					id={"input-field-last-name"}
					label={"Last Name"}
					className="focus-visible:ring-1"
					placeholder={"Enter your last name"}
					required
				/>
			</FieldGroup>

			<DateField
				id="input-field-date-of-birth"
				label="Date of Birth"
				placeholder="Select your birth date"
				required
			/>

			<DropdownField
				id="gender-select"
				label="Gender"
				placeholder="Select your gender"
				items={genderOptions}
			/>

			<FormActions>
				<Button
					type="button"
					variant="outline"
					onClick={previousStep}
				>
					Back
				</Button>

				<Button
					type="button"
					variant="outline"
					className="ml-auto"
				>
					<RotateCcw />
				</Button>

				<Button
					type="submit"
					onClick={nextStep}
				>
					Next
				</Button>
			</FormActions>
		</FieldGroup>
	);
}

export default PersonalDetailsForm;

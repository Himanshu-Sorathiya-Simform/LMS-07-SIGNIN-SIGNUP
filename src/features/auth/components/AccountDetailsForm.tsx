import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import { EyeOff, RotateCcw } from "lucide-react";

function AccountDetailsForm({ nextStep }: { nextStep: () => void }) {
	return (
		<form className="w-full">
			<FieldGroup>
				<InputField
					id={"input-field-email"}
					label={"Email"}
					className="focus-visible:ring-1"
					placeholder={"Enter your email"}
					required
				/>

				<InputField
					id={"input-field-password"}
					label={"Password"}
					className="focus-visible:ring-1"
					placeholder={"Enter your password"}
					endAddon={<EyeOff />}
					required
				/>

				<InputField
					id={"input-field-confirm-password"}
					label={"Confirm Password"}
					className="focus-visible:ring-1"
					placeholder={"Confirm your password"}
					required
				/>

				<InputField
					id={"input-field-phone-number"}
					label={"Phone Number"}
					className="focus-visible:ring-1"
					placeholder={"Enter your phone number"}
				/>

				<FormActions>
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
		</form>
	);
}

export default AccountDetailsForm;

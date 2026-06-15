import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import { RotateCcw } from "lucide-react";

function SigninForm() {
	return (
		<FieldGroup>
			<InputField
				id={"input-field-email"}
				label={"Email"}
				placeholder={"Enter your email"}
			/>

			<InputField
				id={"input-field-password"}
				label={"Password"}
				placeholder={"Enter your password"}
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
					className="mr-auto w-full"
				>
					Login
				</Button>
			</FormActions>
		</FieldGroup>
	);
}

export default SigninForm;

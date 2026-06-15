import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import { RotateCcw } from "lucide-react";

function SigninForm() {
	return (
		<form className="w-full">
			<FieldGroup>
				<InputField
					id={"input-field-email"}
					label={"Email"}
					className="focus-visible:ring-1"
					placeholder={"Enter your email"}
				/>

				<InputField
					id={"input-field-password"}
					label={"Password"}
					className="focus-visible:ring-1"
					placeholder={"Enter your password"}
				/>

				<FormActions className="justify-center">
					<Button
						type="submit"
						className="flex-1"
					>
						Login
					</Button>

					<Button
						type="button"
						variant="outline"
					>
						<RotateCcw />
					</Button>
				</FormActions>
			</FieldGroup>
		</form>
	);
}

export default SigninForm;

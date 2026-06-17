import CheckboxField from "@/components/fields/CheckboxField.tsx";
import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import type { SignupSchema } from "@/schemas/SignupSchema.ts";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import {
	type Control,
	type FormState,
	type UseFormRegister,
	Controller,
} from "react-hook-form";

interface AccountDetailsFormProps {
	register: UseFormRegister<SignupSchema>;
	formState: FormState<SignupSchema>;
	control: Control<SignupSchema>;
}

function AccountDetailsForm({
	register,
	formState,
	control,
}: AccountDetailsFormProps) {
	const [showPassword, setShowPassword] = useState(false);
	const { errors } = formState;

	return (
		<>
			<FieldGroup>
				<InputField
					id={"input-field-email"}
					label={"Email"}
					placeholder={"Enter your email"}
					required
					description={errors.email?.message}
					invalid={!!errors.email}
					{...register("email")}
				/>

				<InputField
					id={"input-field-password"}
					label={"Password"}
					type={showPassword ? "text" : "password"}
					placeholder={"Enter your password"}
					endAddon={
						<Button
							type="button"
							variant={"ghost"}
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ?
								<Eye />
							:	<EyeOff />}
						</Button>
					}
					required
					description={errors.password?.message}
					invalid={!!errors.password}
					{...register("password")}
				/>

				<InputField
					id={"input-field-confirm-password"}
					label={"Confirm Password"}
					placeholder={"Confirm your password"}
					required
					description={errors.confirmPassword?.message}
					invalid={!!errors.confirmPassword}
					{...register("confirmPassword")}
				/>

				<InputField
					id={"input-field-phone-number"}
					label={"Phone Number"}
					placeholder={"Enter your phone number"}
					description={errors.phoneNumber?.message}
					invalid={!!errors.phoneNumber}
					{...register("phoneNumber")}
				/>

				<Controller
					control={control}
					name="termsAndConditions"
					render={({ field }) => (
						<CheckboxField
							id="input-field-terms"
							label="Accept terms and conditions"
							description={
								errors.termsAndConditions?.message
								?? "By clicking this checkbox, you agree to the terms."
							}
							invalid={!!errors.termsAndConditions}
							checked={field.value}
							onCheckedChange={field.onChange}
							onBlur={field.onBlur}
							name={field.name}
						/>
					)}
				/>
			</FieldGroup>
		</>
	);
}

export default AccountDetailsForm;

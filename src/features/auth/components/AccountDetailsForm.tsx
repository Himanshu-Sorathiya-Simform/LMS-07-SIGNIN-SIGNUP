import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import {
	type AccountDetailsSchema,
	accountDetailsSchema,
} from "@/schemas/SignupSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, RotateCcw } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface AccountDetailsFormProps {
	nextStep: () => void;
}

function AccountDetailsForm({ nextStep }: AccountDetailsFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AccountDetailsSchema>({
		resolver: zodResolver(accountDetailsSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			phoneNumber: "",
		},
	});

	const onSubmit: SubmitHandler<AccountDetailsSchema> = (
		data: AccountDetailsSchema,
	) => {
		nextStep();

		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full"
		>
			<FieldGroup>
				<InputField
					id={"input-field-email"}
					label={"Email"}
					className={"focus-visible:ring-1 aria-invalid:ring-1"}
					placeholder={"Enter your email"}
					required
					description={errors.email?.message}
					invalid={!!errors.email}
					{...register("email")}
				/>

				<InputField
					id={"input-field-password"}
					label={"Password"}
					className={"focus-visible:ring-1 aria-invalid:ring-1"}
					placeholder={"Enter your password"}
					endAddon={<EyeOff />}
					required
					description={errors.password?.message}
					invalid={!!errors.password}
					{...register("password")}
				/>

				<InputField
					id={"input-field-confirm-password"}
					label={"Confirm Password"}
					className={"focus-visible:ring-1 aria-invalid:ring-1"}
					placeholder={"Confirm your password"}
					required
					description={errors.confirmPassword?.message}
					invalid={!!errors.confirmPassword}
					{...register("confirmPassword")}
				/>

				<InputField
					id={"input-field-phone-number"}
					label={"Phone Number"}
					className={"focus-visible:ring-1 aria-invalid:ring-1"}
					placeholder={"Enter your phone number"}
					description={errors.phoneNumber?.message}
					invalid={!!errors.phoneNumber}
					{...register("phoneNumber")}
				/>

				<FormActions className={"justify-end"}>
					<Button
						type="button"
						variant="outline"
					>
						<RotateCcw />
					</Button>

					<Button type="submit">Next</Button>
				</FormActions>
			</FieldGroup>
		</form>
	);
}

export default AccountDetailsForm;

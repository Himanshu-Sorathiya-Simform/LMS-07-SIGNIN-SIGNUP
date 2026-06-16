import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import {
	type AccountDetailsSchema,
	accountDetailsSchema,
} from "@/schemas/SignupSchema.ts";
import { getInitialAccountDetails } from "@/utils/sessionStorageUtils.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router";

interface AccountDetailsFormProps {
	nextStep: () => void;
}

function AccountDetailsForm({ nextStep }: AccountDetailsFormProps) {
	const {
		handleSubmit,
		register,
		reset,
		watch,
		formState: { errors },
	} = useForm<AccountDetailsSchema>({
		resolver: zodResolver(accountDetailsSchema),
		defaultValues: getInitialAccountDetails(),
	});

	const formValues = watch();

	useEffect(() => {
		sessionStorage.setItem("signup_account_details", JSON.stringify(formValues));
	}, [formValues]);

	const onSubmit: SubmitHandler<AccountDetailsSchema> = (
		data: AccountDetailsSchema,
	) => {
		sessionStorage.setItem("signup_account_details", JSON.stringify(data));

		nextStep();
	};

	const handleReset = () => {
		sessionStorage.removeItem("signup_account_details");

		reset({
			email: "",
			password: "",
			confirmPassword: "",
			phoneNumber: "",
		});
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
						onClick={handleReset}
					>
						<Trash2 />
					</Button>

					<Button type="submit">Next</Button>
				</FormActions>

				<p className="text-muted-foreground mt-4 text-center text-sm">
					Already a member?{" "}
					<Link
						to="/signin"
						className="text-primary font-medium underline-offset-4 transition-colors hover:underline"
					>
						Sign in here
					</Link>
				</p>
			</FieldGroup>
		</form>
	);
}

export default AccountDetailsForm;

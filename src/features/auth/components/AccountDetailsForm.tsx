import { InputField } from "@/components/fields/InputField.tsx";
import FormActions from "@/components/FormActions";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import {
	type AccountDetailsSchema,
	accountDetailsSchema,
} from "@/schemas/SignupSchema.ts";
import { getInitialAccountDetails, getUsers } from "@/utils/sessionStorageUtils.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface AccountDetailsFormProps {
	nextStep: () => void;
}

function AccountDetailsForm({ nextStep }: AccountDetailsFormProps) {
	const [showPassword, setShowPassword] = useState(false);

	const {
		handleSubmit,
		register,
		reset,
		watch,
		setError,
		formState: { errors },
	} = useForm<AccountDetailsSchema>({
		resolver: zodResolver(accountDetailsSchema),
		defaultValues: getInitialAccountDetails(),
	});

	const formValues = watch();

	useEffect(() => {
		const accountDetails = {
			email: formValues.email,
			password: formValues.password,
			phoneNumber: formValues.phoneNumber,
		};

		sessionStorage.setItem(
			"signup_account_details",
			JSON.stringify(accountDetails),
		);
	}, [formValues]);

	const onSubmit: SubmitHandler<AccountDetailsSchema> = (
		data: AccountDetailsSchema,
	) => {
		const { email } = data;

		const users = getUsers();

		const userExist = users.find((user) => user.email === email);
		if (userExist) {
			setError("email", {
				type: "manual",
				message: "Email is already in use",
			});

			return;
		}

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
		<form onSubmit={handleSubmit(onSubmit)}>
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
					type={showPassword ? "text" : "password"}
					className={"focus-visible:ring-1 aria-invalid:ring-1"}
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
						<RefreshCcw />
					</Button>

					<Button type="submit">Next</Button>
				</FormActions>
			</FieldGroup>
		</form>
	);
}

export default AccountDetailsForm;

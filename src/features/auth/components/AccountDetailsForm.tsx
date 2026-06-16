import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import FormActions from "@/features/auth/components/FormActions";
import {
	type AccountDetailsSchema,
	accountDetailsSchema,
} from "@/schemas/SignupSchema.ts";
import { getInitialAccountDetails, getUsers } from "@/utils/sessionStorageUtils.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router";

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
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold">Account Details</h2>

			<Separator />

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
							<Trash2 />
						</Button>

						<Button type="submit">Next</Button>
					</FormActions>
				</FieldGroup>
			</form>

			<Separator />

			<p className="text-muted-foreground mt-4 text-center text-sm">
				Already a member?{" "}
				<Link
					to="/signin"
					className="text-primary font-medium underline-offset-4 transition-colors hover:underline"
				>
					Sign in here
				</Link>
			</p>
		</div>
	);
}

export default AccountDetailsForm;

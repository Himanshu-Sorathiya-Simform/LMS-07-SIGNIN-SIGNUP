import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import { type SigninSchema, signinSchema } from "@/schemas/SigninSchema.ts";
import { getInitialSigninDetails } from "@/utils/sessionStorageUtils.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router";

function SigninForm() {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors },
	} = useForm<SigninSchema>({
		resolver: zodResolver(signinSchema),
		defaultValues: getInitialSigninDetails(),
	});

	const formValues = watch();

	useEffect(() => {
		sessionStorage.setItem("signin_details", JSON.stringify(formValues));
	}, [formValues]);

	const onSubmit: SubmitHandler<SigninSchema> = function () {
		sessionStorage.removeItem("signin_details");
	};

	const handleReset = () => {
		sessionStorage.removeItem("signin_details");

		reset({
			email: "",
			password: "",
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
					type={"email"}
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
					type={"password"}
					className={"focus-visible:ring-1 aria-invalid:ring-1"}
					placeholder={"Enter your password"}
					required
					description={errors.password?.message}
					invalid={!!errors.password}
					{...register("password")}
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
						onClick={handleReset}
					>
						<Trash2 />
					</Button>
				</FormActions>

				<p className="text-muted-foreground mt-4 text-center text-sm">
					New member?{" "}
					<Link
						to="/signup"
						className="text-primary font-medium underline-offset-4 transition-colors hover:underline"
					>
						Sign up here
					</Link>
				</p>
			</FieldGroup>
		</form>
	);
}

export default SigninForm;

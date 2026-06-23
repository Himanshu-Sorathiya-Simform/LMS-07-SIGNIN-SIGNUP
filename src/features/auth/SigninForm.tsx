import { InputField } from "@/components/fields/InputField.tsx";
import FormActions from "@/components/FormActions";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { type SigninSchema, signinSchema } from "@/schemas/SigninSchema.ts";
import {
	getInitialSigninDetails,
	getUsers,
	removeSessionStorageDetails,
} from "@/utils/sessionStorageUtils.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

interface SigninFormProps {
	onLoginSuccess: (email: string) => void;
}

function SigninForm({ onLoginSuccess }: SigninFormProps) {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		watch,
		setError,
		formState: { errors },
	} = useForm<SigninSchema>({
		resolver: zodResolver(signinSchema),
		defaultValues: getInitialSigninDetails(),
	});

	const formValues = watch();

	useEffect(() => {
		sessionStorage.setItem("signin_details", JSON.stringify(formValues));
	}, [formValues]);

	const onSubmit: SubmitHandler<SigninSchema> = function (data: SigninSchema) {
		const { email, password } = data;
		const users = getUsers();

		const userExist = users.find((user) => user.email === email);
		if (!userExist) {
			setError("email", {
				type: "manual",
				message: "User does not exist",
			});

			return;
		}

		const isPasswordCorrect = userExist.password === password;
		if (!isPasswordCorrect) {
			setError("password", {
				type: "manual",
				message: "Password is incorrect",
			});

			return;
		}

		onLoginSuccess(userExist.email);

		navigate("/profile");

		removeSessionStorageDetails();
	};

	const handleReset = () => {
		sessionStorage.removeItem("signin_details");

		reset({
			email: "",
			password: "",
		});
	};

	return (
		<>
			<div className="flex flex-col gap-4 rounded-md p-5 outline-1 outline-gray-300">
				<h2 className="text-2xl font-bold">Signin</h2>

				<Separator />

				<form onSubmit={handleSubmit(onSubmit)}>
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
								<RefreshCcw />
							</Button>
						</FormActions>
					</FieldGroup>
				</form>
			</div>

			<p className="text-muted-foreground mt-4 text-center text-sm">
				New member?{" "}
				<Link
					to="/signup"
					className="text-primary font-medium underline-offset-4 transition-colors hover:underline"
				>
					Sign up here
				</Link>
			</p>
		</>
	);
}

export default SigninForm;

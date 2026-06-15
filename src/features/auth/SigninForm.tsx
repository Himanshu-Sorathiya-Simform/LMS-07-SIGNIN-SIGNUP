import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import { type SigninSchema, signinSchema } from "@/schemas/SigninSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";

function SigninForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SigninSchema>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<SigninSchema> = (data: SigninSchema) => {
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
					>
						<RotateCcw />
					</Button>
				</FormActions>
			</FieldGroup>
		</form>
	);
}

export default SigninForm;

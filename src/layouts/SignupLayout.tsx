import SignupForm from "@/features/auth/SignupForm.tsx";
import AuthLayout from "./AuthLayout.tsx";

function SignupLayout() {
	return (
		<AuthLayout>
			<SignupForm />
		</AuthLayout>
	);
}

export default SignupLayout;

import SigninForm from "@/features/auth/SigninForm.tsx";
import AuthLayout from "./AuthLayout.tsx";

function SigninLayout() {
	return (
		<AuthLayout>
			<SigninForm />
		</AuthLayout>
	);
}

export default SigninLayout;

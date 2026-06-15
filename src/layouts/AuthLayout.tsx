import type { ReactNode } from "react";

interface AuthLayoutProps {
	children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
	return <section className="w-full max-w-xl min-w-md">{children}</section>;
}

export default AuthLayout;

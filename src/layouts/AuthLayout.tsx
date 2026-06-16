import { Outlet } from "react-router";

function AuthLayout() {
	return (
		<section className="w-full max-w-xl min-w-md">
			<Outlet />
		</section>
	);
}

export default AuthLayout;

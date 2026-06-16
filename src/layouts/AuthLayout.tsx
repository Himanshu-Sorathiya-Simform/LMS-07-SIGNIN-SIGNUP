import { Outlet } from "react-router";

function AuthLayout() {
	return (
		<section className="w-full max-w-xl min-w-md rounded-md p-5 outline-1 outline-gray-300">
			<Outlet />
		</section>
	);
}

export default AuthLayout;

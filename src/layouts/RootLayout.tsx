import { Outlet } from "react-router";

function RootLayout() {
	return (
		<main className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4">
			<Outlet />
		</main>
	);
}

export default RootLayout;

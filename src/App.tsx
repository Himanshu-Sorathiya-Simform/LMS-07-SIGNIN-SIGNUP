import SignupForm from "@/features/auth/SignupForm.tsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Profile from "./features/app/Profile.tsx";
import SigninForm from "./features/auth/SigninForm.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import AuthLayout from "./layouts/AuthLayout.tsx";
import RootLayout from "./layouts/RootLayout.tsx";
import { ProtectedRoute, PublicRoute } from "./routes/Route.tsx";

function App() {
	const { isAuthenticated, login, logout } = useAuth();

	const router = createBrowserRouter([
		{
			element: <RootLayout />,
			children: [
				{
					element: <PublicRoute isAuthenticated={isAuthenticated} />,
					children: [
						{
							element: <AuthLayout />,
							children: [
								{
									path: "/signin",
									element: <SigninForm onLoginSuccess={login} />,
								},
								{
									path: "/signup",
									element: <SignupForm />,
								},
							],
						},
					],
				},
				{
					element: <ProtectedRoute isAuthenticated={isAuthenticated} />,
					children: [
						{
							path: "/profile",
							element: <Profile onLogout={logout} />,
						},
					],
				},
				{
					path: "*",
					element: (
						<Navigate
							to={isAuthenticated ? "/profile" : "/signin"}
							replace
						/>
					),
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
}

export default App;

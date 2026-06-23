import { Navigate, Outlet } from "react-router";

interface GuardProps {
	isAuthenticated: boolean;
}

function ProtectedRoute({ isAuthenticated }: GuardProps) {
	if (!isAuthenticated) {
		return (
			<Navigate
				to="/signin"
				replace
			/>
		);
	}

	return <Outlet />;
}

function PublicRoute({ isAuthenticated }: GuardProps) {
	if (isAuthenticated) {
		return (
			<Navigate
				to="/profile"
				replace
			/>
		);
	}

	return <Outlet />;
}

export { ProtectedRoute, PublicRoute };

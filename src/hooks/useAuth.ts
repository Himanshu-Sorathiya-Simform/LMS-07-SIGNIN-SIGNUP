import { useState } from "react";

function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(function () {
		return localStorage.getItem("is_logged_in") === "true";
	});

	function login() {
		localStorage.setItem("is_logged_in", "true");

		setIsAuthenticated(true);
	}

	function logout() {
		localStorage.removeItem("is_logged_in");

		setIsAuthenticated(false);
	}

	return { isAuthenticated, login, logout };
}

export { useAuth };

import { useState } from "react";

function useAuth() {
	const [userEmail, setUserEmail] = useState<string | null>(function () {
		return localStorage.getItem("user_email");
	});

	const isAuthenticated = !!userEmail;

	function login(email: string) {
		localStorage.setItem("user_email", email);

		setUserEmail(email);
	}

	function logout() {
		localStorage.removeItem("user_email");

		setUserEmail(null);
	}

	return { isAuthenticated, userEmail, login, logout };
}

export { useAuth };

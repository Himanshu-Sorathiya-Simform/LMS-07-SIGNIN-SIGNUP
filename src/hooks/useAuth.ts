import { useState } from "react";

interface User {
	email: string;
}

function useAuth() {
	const [user, setUser] = useState<User | null>(function () {
		const savedEmail = localStorage.getItem("user_email");

		return savedEmail ? { email: savedEmail } : null;
	});

	const isAuthenticated = !!user;

	function login(email: string) {
		localStorage.setItem("user_email", email);

		setUser({ email });
	}

	function logout() {
		localStorage.removeItem("user_email");

		setUser(null);
	}

	return { isAuthenticated, user, login, logout };
}

export { useAuth };

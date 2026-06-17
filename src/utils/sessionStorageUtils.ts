import type { SigninSchema } from "@/schemas/SigninSchema.ts";
import type { SignupSchema } from "@/schemas/SignupSchema.ts";
import type { User } from "@/types/user.types.ts";

function getSessionData<T>(
	key: string,
	fallbackValues: T,
	postProcess?: (data: T) => T,
): T {
	const savedData = sessionStorage.getItem(key);

	if (!savedData) return fallbackValues;

	try {
		const parsed = JSON.parse(savedData);

		return postProcess ? postProcess(parsed) : parsed;
	} catch {
		return fallbackValues;
	}
}

function getUsers() {
	return JSON.parse(localStorage.getItem("auth-users") ?? "[]") as User[];
}

function setUsers(user: User) {
	const users = getUsers();
	users.push(user);

	localStorage.setItem("auth-users", JSON.stringify(users));
}

function getInitialSigninDetails(): SigninSchema {
	return getSessionData<SigninSchema>("signin_details", {
		email: "",
		password: "",
	});
}

function getInitialSignupDetails(): SignupSchema {
	return getSessionData<SignupSchema>(
		"signup_account_details",
		{
			email: "",
			password: "",
			confirmPassword: "",
			phoneNumber: "",
			termsAndConditions: false,
			firstName: "",
			lastName: "",
			dateOfBirth: new Date(),
			gender: "male",
			city: "",
			landmark: "",
			street: "",
			state: "",
			zip: "",
			country: "",
		},
		function (parsed: SignupSchema): SignupSchema {
			return {
				...parsed,
				dateOfBirth:
					parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : new Date(),
			};
		},
	);
}

export { getInitialSigninDetails, getInitialSignupDetails, getUsers, setUsers };

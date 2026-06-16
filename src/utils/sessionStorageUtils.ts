import type { SigninSchema } from "@/schemas/SigninSchema.ts";
import type {
	AccountDetailsSchema,
	AddressDetailsSchema,
	PersonalDetailsSchema,
} from "@/schemas/SignupSchema.ts";

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

function getInitialSigninDetails(): SigninSchema {
	return getSessionData<SigninSchema>("signin_details", {
		email: "",
		password: "",
	});
}

function getInitialAccountDetails(): AccountDetailsSchema {
	return getSessionData<AccountDetailsSchema>("signup_account_details", {
		email: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
	});
}

function getInitialPersonalDetails(): PersonalDetailsSchema {
	return getSessionData<PersonalDetailsSchema>(
		"signup_personal_details",
		{
			firstName: "",
			lastName: "",
			dateOfBirth: new Date(),
			gender: "male",
		},
		function (parsed: PersonalDetailsSchema): PersonalDetailsSchema {
			return {
				...parsed,
				dateOfBirth:
					parsed.dateOfBirth ? new Date(parsed.dateOfBirth) : new Date(),
			};
		},
	);
}

function getInitialAddressDetails(): AddressDetailsSchema {
	return getSessionData<AddressDetailsSchema>("signup_address_details", {
		city: "",
		landmark: "",
		street: "",
		state: "",
		zip: "",
		country: "",
	});
}

export {
	getInitialAccountDetails,
	getInitialAddressDetails,
	getInitialPersonalDetails,
	getInitialSigninDetails,
};

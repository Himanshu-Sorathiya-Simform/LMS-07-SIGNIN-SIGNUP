import z from "zod";

const accountDetailsSchema = z
	.object({
		email: z.email({ message: "Please enter a valid email address" }),

		password: z
			.string()
			.min(1, { message: "Password is required" })
			.min(8, { message: "Password must be at least 8 characters" })
			.max(18, { message: "Password must not exceed 18 characters" })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[0-9]/, { message: "Password must contain at least one number" })
			.regex(/[^A-Za-z0-9]/, {
				message: "Password must contain at least one special character",
			})
			.regex(/^[^<>]*$/, {
				message: "Password contains invalid characters",
			}),

		confirmPassword: z
			.string()
			.min(1, { message: "Password is required" })
			.min(8, { message: "Password must be at least 8 characters" })
			.max(18, { message: "Password must not exceed 18 characters" })
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[0-9]/, { message: "Password must contain at least one number" })
			.regex(/[^A-Za-z0-9]/, {
				message: "Password must contain at least one special character",
			})
			.regex(/^[^<>]*$/, {
				message: "Password contains invalid characters",
			}),

		phoneNumber: z
			.string()
			.trim()
			.regex(/^[0-9]{10}$/, {
				message: "Phone number must be exactly 10 digits",
			})
			.optional()
			.or(z.literal("")),

		termsAndConditions: z.boolean().refine((val) => val === true, {
			message: "You must accept company terms and policies",
		}),
	})
	.refine((data) => data.confirmPassword === data.password, {
		message: "Both password do not match",
		path: ["confirmPassword"],
	});

const personalDetailsSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(1, { message: "First name is required" })
		.min(2, { message: "First name must be at least 2 characters" })
		.max(50, { message: "First name cannot exceed 50 characters" })
		.regex(/^[A-Za-z\s-]+$/, {
			message: "First name can only contain letters, spaces, or hyphens",
		}),

	lastName: z
		.string()
		.trim()
		.min(1, { message: "Last name is required" })
		.min(2, { message: "Last name must be at least 2 characters" })
		.max(50, { message: "Last name cannot exceed 50 characters" })
		.regex(/^[A-Za-z\s-]+$/, {
			message: "Last name can only contain letters, spaces, or hyphens",
		}),

	dateOfBirth: z
		.date({ message: "Date of birth is required" })
		.refine((date) => date <= new Date(), {
			message: "Date of birth cannot be in the future",
		}),

	gender: z.enum(["male", "female", "other", "prefer_not_to_say"], {
		message: "Please select a valid gender option",
	}),
});

const addressDetailsSchema = z.object({
	street: z
		.string()
		.trim()
		.min(1, { message: "Street address is required" })
		.min(3, { message: "Street address must be at least 3 characters" })
		.max(100, { message: "Street address cannot exceed 100 characters" }),

	landmark: z
		.string()
		.trim()
		.min(3, { message: "Landmark must be at least 3 characters" })
		.max(100, { message: "Landmark cannot exceed 100 characters" })
		.optional()
		.or(z.literal("")),

	city: z
		.string()
		.trim()
		.min(1, { message: "City is required" })
		.min(2, { message: "City name must be at least 2 characters" })
		.max(50, { message: "City name cannot exceed 50 characters" }),

	state: z
		.string()
		.trim()
		.min(1, { message: "State is required" })
		.min(2, { message: "State name must be at least 2 characters" })
		.max(50, { message: "State name cannot exceed 50 characters" }),

	zip: z
		.string()
		.trim()
		.min(1, { message: "ZIP/Postal code is required" })
		.regex(/^[0-9]{5,6}$/, {
			message: "ZIP/Postal code must be a valid 5 or 6 digit number",
		}),

	country: z
		.string()
		.trim()
		.min(1, { message: "Country is required" })
		.min(2, { message: "Country name must be at least 2 characters" })
		.max(50, { message: "Country name cannot exceed 50 characters" }),
});

type AccountDetailsSchema = z.infer<typeof accountDetailsSchema>;
type PersonalDetailsSchema = z.infer<typeof personalDetailsSchema>;
type AddressDetailsSchema = z.infer<typeof addressDetailsSchema>;

export {
	type AccountDetailsSchema,
	type AddressDetailsSchema,
	type PersonalDetailsSchema,
	accountDetailsSchema,
	addressDetailsSchema,
	personalDetailsSchema,
};

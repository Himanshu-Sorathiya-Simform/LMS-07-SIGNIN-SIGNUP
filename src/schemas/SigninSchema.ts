import { z } from "zod";

const signinSchema = z.object({
	email: z
		.string()
		.trim()
		.toLowerCase()
		.min(1, { message: "Email address is required" })
		.pipe(z.email({ message: "Please enter a valid email address" })),

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
});

type SigninSchema = z.infer<typeof signinSchema>;

export { type SigninSchema, signinSchema };

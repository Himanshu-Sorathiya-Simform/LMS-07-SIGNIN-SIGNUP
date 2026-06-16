import { z } from "zod";

const signinSchema = z.object({
	email: z.email({ message: "Please enter a valid email address" }),

	password: z.string().min(1, { message: "Password is required" }),
});

type SigninSchema = z.infer<typeof signinSchema>;

export { type SigninSchema, signinSchema };

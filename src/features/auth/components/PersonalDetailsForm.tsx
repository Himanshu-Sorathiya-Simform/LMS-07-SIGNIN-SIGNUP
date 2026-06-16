import { DateField } from "@/components/fields/DateField.tsx";
import { DropdownField } from "@/components/fields/DropdownField.tsx";
import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import FormActions from "@/features/auth/components/FormActions";
import {
	type PersonalDetailsSchema,
	personalDetailsSchema,
} from "@/schemas/SignupSchema.ts";
import { getInitialPersonalDetails } from "@/utils/sessionStorageUtils.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { type SubmitHandler, Controller, useForm } from "react-hook-form";

interface PersonalDetailsFormProps {
	nextStep: () => void;
	previousStep: () => void;
}

function PersonalDetailsForm({ nextStep, previousStep }: PersonalDetailsFormProps) {
	const genderOptions = [
		{ value: "male", label: "Male" },
		{ value: "female", label: "Female" },
		{ value: "other", label: "Other" },
		{ value: "prefer_not_to_say", label: "Prefer not to say" },
	];

	const {
		control,
		register,
		reset,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<PersonalDetailsSchema>({
		resolver: zodResolver(personalDetailsSchema),
		defaultValues: getInitialPersonalDetails(),
	});

	const formValues = watch();

	useEffect(() => {
		sessionStorage.setItem(
			"signup_personal_details",
			JSON.stringify(formValues),
		);
	}, [formValues]);

	const onSubmit: SubmitHandler<PersonalDetailsSchema> = (
		data: PersonalDetailsSchema,
	) => {
		sessionStorage.setItem("signup_personal_details", JSON.stringify(data));

		nextStep();
	};

	const handleReset = () => {
		sessionStorage.removeItem("signup_personal_details");

		reset({
			firstName: "",
			lastName: "",
			dateOfBirth: new Date(),
			gender: "male",
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<h2 className="text-2xl font-bold">Address Details</h2>

			<Separator />

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="w-full"
			>
				<FieldGroup>
					<FieldGroup className="grid min-w-sm grid-cols-2">
						<InputField
							id={"input-field-first-name"}
							label={"First Name"}
							className={"focus-visible:ring-1 aria-invalid:ring-1"}
							placeholder={"Enter your first name"}
							required
							description={errors.firstName?.message}
							invalid={!!errors.firstName}
							{...register("firstName")}
						/>

						<InputField
							id={"input-field-last-name"}
							label={"Last Name"}
							className={"focus-visible:ring-1 aria-invalid:ring-1"}
							placeholder={"Enter your last name"}
							required
							description={errors.lastName?.message}
							invalid={!!errors.lastName}
							{...register("lastName")}
						/>
					</FieldGroup>

					<Controller
						control={control}
						name="dateOfBirth"
						render={({ field }) => (
							<DateField
								id="input-field-date-of-birth"
								label="Date of Birth"
								className={
									"focus-visible:ring-1 aria-invalid:ring-1"
								}
								placeholder="Select your birth date"
								required
								description={errors.dateOfBirth?.message}
								invalid={!!errors.dateOfBirth}
								date={field.value}
								onDateChange={field.onChange}
								onBlur={field.onBlur}
								name={field.name}
							/>
						)}
					/>

					<Controller
						control={control}
						name="gender"
						render={({ field }) => (
							<DropdownField
								id="gender-select"
								label="Gender"
								placeholder="Select your gender"
								items={genderOptions}
								description={errors.gender?.message}
								invalid={!!errors.gender}
								required
								value={field.value}
								onValueChange={field.onChange}
								onBlur={field.onBlur}
								name={field.name}
							/>
						)}
					/>

					<FormActions>
						<Button
							type="button"
							variant="outline"
							onClick={previousStep}
						>
							Back
						</Button>

						<Button
							type="button"
							variant="outline"
							className="ml-auto"
							onClick={handleReset}
						>
							<Trash2 />
						</Button>

						<Button type="submit">Next</Button>
					</FormActions>
				</FieldGroup>
			</form>
		</div>
	);
}

export default PersonalDetailsForm;

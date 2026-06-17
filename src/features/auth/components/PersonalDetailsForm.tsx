import { DateField } from "@/components/fields/DateField.tsx";
import { DropdownField } from "@/components/fields/DropdownField.tsx";
import { InputField } from "@/components/fields/InputField.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import { genderOptions } from "@/constansts/dropdownOptions.ts";
import type { SignupSchema } from "@/schemas/SignupSchema.ts";
import {
	type Control,
	type FormState,
	type UseFormRegister,
	Controller,
} from "react-hook-form";

interface PersonalDetailsFormProps {
	register: UseFormRegister<SignupSchema>;
	formState: FormState<SignupSchema>;
	control: Control<SignupSchema>;
}

function PersonalDetailsForm({
	register,
	formState,
	control,
}: PersonalDetailsFormProps) {
	const { errors } = formState;

	return (
		<>
			<FieldGroup>
				<FieldGroup className="grid min-w-sm grid-cols-2">
					<InputField
						id={"input-field-first-name"}
						label={"First Name"}
						placeholder={"Enter your first name"}
						required
						description={errors.firstName?.message}
						invalid={!!errors.firstName}
						{...register("firstName")}
					/>

					<InputField
						id={"input-field-last-name"}
						label={"Last Name"}
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
			</FieldGroup>
		</>
	);
}

export default PersonalDetailsForm;

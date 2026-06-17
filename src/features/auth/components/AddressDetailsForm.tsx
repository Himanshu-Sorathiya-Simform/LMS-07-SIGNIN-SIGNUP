import { InputField } from "@/components/fields/InputField.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import { type SignupSchema } from "@/schemas/SignupSchema.ts";
import { type FormState, type UseFormRegister } from "react-hook-form";

interface AddressDetailsFormProps {
	register: UseFormRegister<SignupSchema>;
	formState: FormState<SignupSchema>;
}

function AddressDetailsForm({ register, formState }: AddressDetailsFormProps) {
	const { errors } = formState;

	return (
		<>
			<FieldGroup>
				<FieldGroup className="grid grid-cols-2">
					<InputField
						id={"input-field-street"}
						label={"Street"}
						placeholder={"Enter your street"}
						required
						description={errors.street?.message}
						invalid={!!errors.street}
						{...register("street")}
					/>

					<InputField
						id={"input-field-landmark"}
						label={"Landmark"}
						placeholder={"Enter your landmark"}
						description={errors.landmark?.message}
						invalid={!!errors.landmark}
						{...register("landmark")}
					/>
				</FieldGroup>

				<FieldGroup className="grid grid-cols-2">
					<InputField
						id={"input-field-city"}
						label={"City"}
						placeholder={"Enter your city"}
						required
						description={errors.city?.message}
						invalid={!!errors.city}
						{...register("city")}
					/>

					<InputField
						id={"input-field-state"}
						label={"State"}
						placeholder={"Enter your state"}
						required
						description={errors.state?.message}
						invalid={!!errors.state}
						{...register("state")}
					/>
				</FieldGroup>

				<FieldGroup className="grid grid-cols-2">
					<InputField
						id={"input-field-zip"}
						label={"Zip"}
						placeholder={"Enter your zip"}
						required
						description={errors.zip?.message}
						invalid={!!errors.zip}
						{...register("zip")}
					/>

					<InputField
						id={"input-field-country"}
						label={"Country"}
						placeholder={"Enter your country"}
						required
						description={errors.country?.message}
						invalid={!!errors.country}
						{...register("country")}
					/>
				</FieldGroup>
			</FieldGroup>
		</>
	);
}

export default AddressDetailsForm;

import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import {
	type AddressDetailsSchema,
	addressDetailsSchema,
} from "@/schemas/SignupSchema.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCcw } from "lucide-react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface AddressDetailsFormProps {
	previousStep: () => void;
}

function AddressDetailsForm({ previousStep }: AddressDetailsFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AddressDetailsSchema>({
		resolver: zodResolver(addressDetailsSchema),
		defaultValues: {
			city: "",
			landmark: "",
			street: "",
			state: "",
			zip: "",
			country: "",
		},
	});

	const onSubmit: SubmitHandler<AddressDetailsSchema> = (
		data: AddressDetailsSchema,
	) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full"
		>
			<FieldGroup>
				<FieldGroup className="grid grid-cols-2">
					<InputField
						id={"input-field-street"}
						label={"Street"}
						className={"focus-visible:ring-1 aria-invalid:ring-1"}
						placeholder={"Enter your street"}
						required
						description={errors.street?.message}
						invalid={!!errors.street}
						{...register("street")}
					/>

					<InputField
						id={"input-field-landmark"}
						label={"Landmark"}
						className={"focus-visible:ring-1 aria-invalid:ring-1"}
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
						className={"focus-visible:ring-1 aria-invalid:ring-1"}
						placeholder={"Enter your city"}
						required
						description={errors.city?.message}
						invalid={!!errors.city}
						{...register("city")}
					/>

					<InputField
						id={"input-field-state"}
						label={"State"}
						className={"focus-visible:ring-1 aria-invalid:ring-1"}
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
						className={"focus-visible:ring-1 aria-invalid:ring-1"}
						placeholder={"Enter your zip"}
						required
						description={errors.zip?.message}
						invalid={!!errors.zip}
						{...register("zip")}
					/>

					<InputField
						id={"input-field-country"}
						label={"Country"}
						className={"focus-visible:ring-1 aria-invalid:ring-1"}
						placeholder={"Enter your country"}
						required
						description={errors.country?.message}
						invalid={!!errors.country}
						{...register("country")}
					/>
				</FieldGroup>

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
					>
						<RotateCcw />
					</Button>

					<Button type="submit">Next</Button>
				</FormActions>
			</FieldGroup>
		</form>
	);
}

export default AddressDetailsForm;

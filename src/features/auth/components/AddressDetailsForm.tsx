import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import {
	type AddressDetailsSchema,
	addressDetailsSchema,
} from "@/schemas/SignupSchema.ts";
import { getInitialAddressDetails } from "@/utils/sessionStorageUtils.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

interface AddressDetailsFormProps {
	previousStep: () => void;
}

function AddressDetailsForm({ previousStep }: AddressDetailsFormProps) {
	const {
		handleSubmit,
		register,
		reset,
		watch,
		formState: { errors },
	} = useForm<AddressDetailsSchema>({
		resolver: zodResolver(addressDetailsSchema),
		defaultValues: getInitialAddressDetails(),
	});

	const formValues = watch();

	useEffect(() => {
		sessionStorage.setItem("signup_address_details", JSON.stringify(formValues));
	}, [formValues]);

	const onSubmit: SubmitHandler<AddressDetailsSchema> = () => {
		sessionStorage.removeItem("signup_current_step");
		sessionStorage.removeItem("signup_account_details");
		sessionStorage.removeItem("signup_personal_details");
		sessionStorage.removeItem("signup_address_details");
	};

	const handleReset = () => {
		sessionStorage.removeItem("signup_address_details");

		reset({
			city: "",
			landmark: "",
			street: "",
			state: "",
			zip: "",
			country: "",
		});
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
						onClick={handleReset}
					>
						<Trash2 />
					</Button>

					<Button type="submit">Submit</Button>
				</FormActions>
			</FieldGroup>
		</form>
	);
}

export default AddressDetailsForm;

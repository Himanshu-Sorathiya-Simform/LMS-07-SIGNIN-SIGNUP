import { InputField } from "@/components/fields/InputField.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FieldGroup } from "@/components/ui/field.tsx";
import FormActions from "@/features/auth/components/FormActions";
import { RotateCcw } from "lucide-react";

function AddressDetailsForm({ previousStep }: { previousStep: () => void }) {
	return (
		<FieldGroup>
			<FieldGroup className="grid grid-cols-2">
				<InputField
					id={"input-field-street"}
					label={"Street"}
					className="focus-visible:ring-1"
					placeholder={"Enter your street"}
					required
				/>

				<InputField
					id={"input-field-landmark"}
					label={"Landmark"}
					className="focus-visible:ring-1"
					placeholder={"Enter your landmark"}
				/>
			</FieldGroup>

			<FieldGroup className="grid grid-cols-2">
				<InputField
					id={"input-field-city"}
					label={"City"}
					className="focus-visible:ring-1"
					placeholder={"Enter your city"}
					required
				/>

				<InputField
					id={"input-field-state"}
					label={"State"}
					className="focus-visible:ring-1"
					placeholder={"Enter your state"}
					required
				/>
			</FieldGroup>

			<FieldGroup className="grid grid-cols-2">
				<InputField
					id={"input-field-zip"}
					label={"Zip"}
					className="focus-visible:ring-1"
					placeholder={"Enter your zip"}
					required
				/>

				<InputField
					id={"input-field-country"}
					label={"Country"}
					className="focus-visible:ring-1"
					placeholder={"Enter your country"}
					required
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
	);
}

export default AddressDetailsForm;

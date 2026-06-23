import { Checkbox } from "../ui/checkbox.tsx";
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field.tsx";

interface CheckboxFieldProps {
	id: string;
	label: string;
	className?: string | undefined;
	description?: string | undefined;
	invalid?: boolean | undefined;
	checked?: boolean | undefined;
	onCheckedChange?: (checked: boolean) => void | undefined;
	onBlur?: () => void | undefined;
	name?: string | undefined;
}

function CheckboxField({
	id,
	label,
	className = "",
	description = "",
	invalid = false,
	checked = false,
	onCheckedChange = () => {},
	onBlur = () => {},
	name = "",
}: CheckboxFieldProps) {
	return (
		<Field
			orientation="horizontal"
			data-invalid={invalid ? true : false}
		>
			<Checkbox
				id={id}
				name={name}
				className={className}
				aria-invalid={invalid}
				checked={checked}
				onCheckedChange={onCheckedChange}
				onBlur={onBlur}
			/>

			<FieldContent>
				<FieldLabel htmlFor={id}>{label}</FieldLabel>

				{description && <FieldDescription>{description}</FieldDescription>}
			</FieldContent>
		</Field>
	);
}

export default CheckboxField;

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";

interface InputFieldProps {
	id: string;
	label: string;
	className?: string;
	placeholder?: string;
	type?: string;
	description?: string;
	disabled?: boolean;
	invalid?: boolean;
	required?: boolean;
	endAddon?: React.ReactNode;
}

export function InputField({
	id,
	label,
	className = "",
	type = "text",
	placeholder = "",
	description = "",
	disabled = false,
	invalid = false,
	required = false,
	endAddon = "",
}: InputFieldProps) {
	return (
		<Field
			data-disabled={disabled ? "" : undefined}
			data-invalid={invalid ? "" : undefined}
		>
			<FieldLabel htmlFor={id}>
				{label}
				{required && <span className="text-destructive">*</span>}
			</FieldLabel>

			{endAddon ?
				<InputGroup>
					<InputGroupInput
						id={id}
						type={type}
						className={className}
						placeholder={placeholder}
						disabled={disabled}
						aria-invalid={invalid}
					/>

					<InputGroupAddon align="inline-end">{endAddon}</InputGroupAddon>
				</InputGroup>
			:	<Input
					id={id}
					type={type}
					className={className}
					placeholder={placeholder}
					disabled={disabled}
					aria-invalid={invalid}
				/>
			}

			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	);
}

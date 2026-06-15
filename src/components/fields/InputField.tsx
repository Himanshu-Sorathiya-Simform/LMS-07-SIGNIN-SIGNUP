import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	description?: string | undefined;
	invalid?: boolean | undefined;
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
	...rhfProps
}: InputFieldProps) {
	return (
		<Field
			data-disabled={disabled ? true : undefined}
			data-invalid={invalid ? true : undefined}
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
						{...rhfProps}
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
					{...rhfProps}
				/>
			}

			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	);
}

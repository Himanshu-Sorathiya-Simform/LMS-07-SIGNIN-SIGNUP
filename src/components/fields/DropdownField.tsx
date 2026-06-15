import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface DropdownItem {
	value: string;
	label: string;
}

interface DropdownFieldProps {
	id: string;
	label: string;
	placeholder: string;
	items: DropdownItem[];
	description?: string;
	disabled?: boolean;
	invalid?: boolean;
	required?: boolean;
	value?: string;
	onValueChange?: (value: string) => void;
}

export function DropdownField({
	id,
	label,
	placeholder,
	items,
	description = "",
	disabled = false,
	invalid = false,
	required = true,
	value = "",
	onValueChange = () => {},
}: DropdownFieldProps) {
	return (
		<Field
			data-disabled={disabled ? true : undefined}
			data-invalid={invalid ? true : undefined}
		>
			<FieldLabel htmlFor={id}>
				{label}
				{required && <span className="text-destructive">*</span>}
			</FieldLabel>

			<Select
				value={value}
				onValueChange={onValueChange}
				disabled={disabled}
				required={required}
			>
				<SelectTrigger
					id={id}
					aria-invalid={invalid}
					className="w-full"
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>

				<SelectContent>
					{items.map((item) => (
						<SelectItem
							key={item.value}
							value={item.value}
						>
							{item.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	);
}

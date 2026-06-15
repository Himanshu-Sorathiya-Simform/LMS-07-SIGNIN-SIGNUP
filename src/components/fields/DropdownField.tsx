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
	description?: string | undefined;
	disabled?: boolean | undefined;
	invalid?: boolean | undefined;
	required?: boolean | undefined;
	value?: string | undefined;
	onValueChange?: (value: string) => void;
	onBlur?: () => void;
	name?: string;
}

export function DropdownField({
	id,
	label,
	placeholder,
	items,
	description,
	disabled = false,
	invalid = false,
	required = false,
	value,
	onValueChange = () => {},
	onBlur,
	name,
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
				value={value ?? ""}
				onValueChange={onValueChange}
				disabled={disabled}
				name={name ?? ""}
			>
				<SelectTrigger
					id={id}
					onBlur={onBlur}
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

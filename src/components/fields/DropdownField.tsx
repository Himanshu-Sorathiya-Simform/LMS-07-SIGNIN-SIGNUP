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
	items: DropdownItem[];
	className?: string | undefined;
	placeholder?: string | undefined;
	description?: string | undefined;
	disabled?: boolean | undefined;
	invalid?: boolean | undefined;
	required?: boolean | undefined;
	value?: string | undefined;
	onValueChange?: (value: string) => void | undefined;
	onBlur?: () => void | undefined;
	name?: string | undefined;
}

export function DropdownField({
	id,
	label,
	items,
	className = "",
	placeholder = "",
	description = "",
	disabled = false,
	invalid = false,
	required = false,
	value = "",
	onValueChange = () => {},
	onBlur = () => {},
	name = "",
}: DropdownFieldProps) {
	return (
		<Field
			data-disabled={disabled ? true : false}
			data-invalid={invalid ? true : false}
		>
			<FieldLabel htmlFor={id}>
				{label}
				{required && <span className="text-destructive">*</span>}
			</FieldLabel>

			<Select
				value={value}
				onValueChange={onValueChange}
				disabled={disabled}
				name={name}
			>
				<SelectTrigger
					id={id}
					onBlur={onBlur}
					aria-invalid={invalid}
					className={`w-full ${className}`}
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

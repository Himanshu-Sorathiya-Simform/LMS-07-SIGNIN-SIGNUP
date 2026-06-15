import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

interface DateFieldProps {
	id: string;
	label: string;
	placeholder?: string | undefined;
	description?: string | undefined;
	disabled?: boolean | undefined;
	invalid?: boolean | undefined;
	required?: boolean | undefined;
	date?: Date | undefined;
	onDateChange?: (value: Date | undefined) => void;
	name?: string;
	onBlur?: () => void;
}

export function DateField({
	id,
	label,
	placeholder = "Pick a date",
	description,
	disabled = false,
	invalid = false,
	required = false,
	date,
	onDateChange = () => {},
	name,
	onBlur,
}: DateFieldProps) {
	return (
		<Field
			data-disabled={disabled ? true : undefined}
			data-invalid={invalid ? true : undefined}
		>
			<FieldLabel htmlFor={id}>
				{label}
				{required && <span className="text-destructive">*</span>}
			</FieldLabel>

			<Popover>
				<PopoverTrigger asChild>
					<Button
						id={id}
						name={name}
						onBlur={onBlur}
						disabled={disabled}
						aria-invalid={invalid}
						variant={"outline"}
						className={cn(
							"w-full justify-start text-left font-normal",
							!date && "text-muted-foreground",
							invalid
								&& "border-destructive focus-visible:ring-destructive",
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />

						{date ? format(date, "PPP") : <span>{placeholder}</span>}
					</Button>
				</PopoverTrigger>

				<PopoverContent
					className="w-auto p-0"
					align="start"
				>
					<Calendar
						mode="single"
						selected={date}
						onSelect={(day) => onDateChange(day)}
					/>
				</PopoverContent>
			</Popover>

			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	);
}

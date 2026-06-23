import { Field } from "@/components/ui/field.tsx";
import type { ReactNode } from "react";

interface FormActionsProps {
	children: ReactNode;
	className?: string;
}

function FormActions({ children, className = "" }: FormActionsProps) {
	return (
		<Field
			orientation="horizontal"
			className={className}
		>
			{children}
		</Field>
	);
}

export default FormActions;

import { Field } from "@/components/ui/field.tsx";

function FormActions({ children }: { children?: React.ReactNode }) {
	return <Field orientation="horizontal">{children}</Field>;
}

export default FormActions;

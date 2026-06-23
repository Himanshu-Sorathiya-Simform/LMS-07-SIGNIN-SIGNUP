import { Button } from "@/components/ui/button.tsx";
import { Navigate } from "react-router";
import PersonalDetails from "./components/ProfileDetails.tsx";

interface ProfileProps {
	userEmail: string | null;
	onLogout: () => void;
}

function Profile({ userEmail, onLogout }: ProfileProps) {
	if (!userEmail)
		return (
			<Navigate
				to="/signin"
				replace
			/>
		);

	return (
		<div className="flex w-full max-w-xl min-w-md flex-col gap-4 rounded-lg p-4 outline-1 outline-gray-300">
			<PersonalDetails userEmail={userEmail} />

			<Button
				variant="outline"
				onClick={onLogout}
			>
				Logout
			</Button>
		</div>
	);
}

export default Profile;

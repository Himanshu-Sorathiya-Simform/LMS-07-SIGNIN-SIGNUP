import { Separator } from "@/components/ui/separator.tsx";
import { getUsers } from "@/utils/sessionStorageUtils.ts";
import { format } from "date-fns";
import { UserRound } from "lucide-react";
import { Navigate } from "react-router";

interface ProfileDetailsProps {
	userEmail: string;
}

function ProfileDetails({ userEmail }: ProfileDetailsProps) {
	const user = getUsers().find((user) => user.email === userEmail);

	if (!user)
		return (
			<Navigate
				to="/signin"
				replace
			/>
		);

	return (
		<div className="flex flex-col gap-2">
			<UserRound className="mx-auto size-30 rounded-full bg-gray-100 p-2" />

			<h3 className="text-xl font-bold">Account Details</h3>

			<Separator />

			<div className="grid grid-cols-[auto_1fr_auto_1fr] gap-x-2 text-gray-500">
				<span>Email: </span>
				<span className="font-semibold text-black">{user.email}</span>

				<span>Name: </span>
				<span className="font-semibold text-black">
					{user.firstName} {user.lastName}
				</span>

				<span>DOB: </span>
				<span className="font-semibold text-black">
					{format(new Date(user.dateOfBirth), "MMMM d, yyyy")}
				</span>

				{user.phoneNumber && (
					<>
						<span>Phone Number: </span>
						<span className="font-semibold text-black">
							{user.phoneNumber}
						</span>
					</>
				)}

				<span>Gender: </span>
				<span className="font-semibold text-black capitalize">
					{user.gender}
				</span>
			</div>

			<h3 className="text-xl font-bold">Address Details</h3>

			<Separator />

			<div className="grid grid-cols-[auto_1fr_auto_1fr] gap-x-2 text-gray-500">
				<span>Street: </span>
				<span className="font-semibold text-black">{user.street}</span>

				{user.landmark && (
					<>
						<span>Landmark: </span>
						<span className="font-semibold text-black">
							{user.landmark}
						</span>
					</>
				)}

				<span>City: </span>
				<span className="font-semibold text-black">{user.city}</span>

				<span>Zip: </span>
				<span className="font-semibold text-black">{user.zip}</span>

				<span>State: </span>
				<span className="font-semibold text-black">{user.state}</span>

				<span>Country: </span>
				<span className="font-semibold text-black">{user.country}</span>
			</div>
		</div>
	);
}

export default ProfileDetails;

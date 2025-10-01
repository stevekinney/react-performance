import { use } from 'react';
import { Card } from '$components/card';
import type { User } from '../types';

interface UserInfoProps {
	userPromise: Promise<User>;
}

export function UserInfo({ userPromise }: UserInfoProps) {
	const user = use(userPromise);

	return (
		<Card className="p-6">
			<h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-100">
				User Information
			</h2>
			<div className="space-y-4">
				<div className="flex items-start space-x-4">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-200">
						{user.name.charAt(0)}
					</div>
					<div>
						<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{user.name}</h3>
						<p className="text-sm text-slate-600 dark:text-slate-400">@{user.username}</p>
					</div>
				</div>
				<div className="space-y-2 text-sm">
					<p className="text-slate-600 dark:text-slate-400">
						<strong>Email:</strong> {user.email}
					</p>
					<p className="text-slate-600 dark:text-slate-400">
						<strong>Phone:</strong> {user.phone}
					</p>
					<p className="text-slate-600 dark:text-slate-400">
						<strong>Website:</strong> {user.website}
					</p>
				</div>
			</div>
		</Card>
	);
}

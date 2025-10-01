import { UserProfileCard } from './user-profile-card';
import { ThemeSettingsCard } from './theme-settings-card';
import { NotificationSettingsCard } from './notification-settings-card';
import { StatsCard } from './stats-card';

export function Dashboard() {
	return (
		<section className="grid grid-cols-1 gap-6 md:grid-cols-2">
			<UserProfileCard />
			<ThemeSettingsCard />
			<NotificationSettingsCard />
			<StatsCard />
		</section>
	);
}

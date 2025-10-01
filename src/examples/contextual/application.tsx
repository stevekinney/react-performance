import { Container } from '$components/container';
import { UserProvider } from './contexts/user-context';
import { ThemeProvider } from './contexts/theme-context';
import { NotificationsProvider } from './contexts/notifications-context';
import { StatsProvider } from './contexts/stats-context';
import { Dashboard } from './components/dashboard';

function Application() {
	return (
		<UserProvider>
			<ThemeProvider>
				<NotificationsProvider>
					<StatsProvider>
						<Container className="my-8 space-y-8">
							<section>
								<h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Contextual</h1>
								<p className="text-slate-600 dark:text-slate-400">
					Now with split contexts! Open your console and change any setting. Only the relevant
					component re-renders.
								</p>
								<div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
									<p className="text-sm font-medium text-green-800 dark:text-green-200">
										✅ Split contexts: Only relevant consumers re-render
									</p>
								</div>
							</section>

							<Dashboard />

							<section className="rounded-md bg-slate-100 p-6 dark:bg-slate-800">
								<h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
									The Benefits
								</h2>
								<ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
									<li>✅ Each context manages a single concern (user, theme, notifications, stats)</li>
									<li>✅ Components only subscribe to the context they need</li>
									<li>✅ Changing theme doesn&apos;t re-render user profile or stats</li>
									<li>✅ Context values are memoized to prevent unnecessary re-renders</li>
									<li>✅ Much better performance with minimal code changes</li>
								</ul>
							</section>
						</Container>
					</StatsProvider>
				</NotificationsProvider>
			</ThemeProvider>
		</UserProvider>
	);
}

export default Application;

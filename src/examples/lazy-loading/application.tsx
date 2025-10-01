import { lazy, Suspense, useState } from 'react';
import { Container } from '$components/container';
import type { TabId } from './types';

// ✅ Keep lightweight components eager
import { WelcomeTab } from './components/welcome-tab';
import { LoadingFallback } from './components/loading-fallback';

// ✅ Lazy load heavy components
const DataTableTab = lazy(() =>
	import('./components/data-table-tab').then((m) => ({ default: m.DataTableTab })),
);

const ChartTab = lazy(() => import('./components/chart-tab').then((m) => ({ default: m.ChartTab })));

const tabs = [
	{ id: 'welcome' as TabId, label: 'Welcome', description: 'Lightweight intro' },
	{ id: 'data' as TabId, label: 'Data Table', description: '100 rows of data' },
	{ id: 'chart' as TabId, label: 'Charts', description: 'Visual analytics' },
];

function Application() {
	const [activeTab, setActiveTab] = useState<TabId>('welcome');

	return (
		<Container className="my-8 space-y-8">
			<section>
				<h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
					Lazy Loading Demo
				</h1>
				<p className="text-slate-600 dark:text-slate-400">
					Now tabs are lazy loaded! Open the Network tab and switch tabs - you&apos;ll see separate
					chunks being downloaded only when you click each tab.
				</p>
				<div className="mt-4 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
					<p className="text-sm font-medium text-green-800 dark:text-green-200">
						✅ Components lazy loaded: smaller initial bundle, faster page load
					</p>
				</div>
			</section>

			<section>
				<div className="border-b border-slate-200 dark:border-slate-700">
					<div className="flex space-x-8">
						{tabs.map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveTab(tab.id)}
								className={`border-b-2 pb-4 pt-2 text-sm font-medium transition-colors ${
									activeTab === tab.id
										? 'border-blue-500 text-blue-600 dark:text-blue-400'
										: 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
								}`}
							>
								<div className="flex flex-col items-start">
									<span>{tab.label}</span>
									<span className="text-xs font-normal text-slate-500 dark:text-slate-500">
										{tab.description}
									</span>
								</div>
							</button>
						))}
					</div>
				</div>

				<div className="pt-6">
					{activeTab === 'welcome' && <WelcomeTab />}
					{activeTab === 'data' && (
						<Suspense fallback={<LoadingFallback />}>
							<DataTableTab />
						</Suspense>
					)}
					{activeTab === 'chart' && (
						<Suspense fallback={<LoadingFallback />}>
							<ChartTab />
						</Suspense>
					)}
				</div>
			</section>

			<section className="rounded-md bg-slate-100 p-6 dark:bg-slate-800">
				<h2 className="mb-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
					The Benefits
				</h2>
				<ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
					<li>✅ Only Welcome tab code is in the initial bundle</li>
					<li>✅ Data Table and Charts download only when needed</li>
					<li>✅ Faster initial page load</li>
					<li>✅ Loading fallbacks provide visual feedback</li>
					<li>✅ Code automatically split by bundler</li>
				</ul>
			</section>
		</Container>
	);
}

export default Application;

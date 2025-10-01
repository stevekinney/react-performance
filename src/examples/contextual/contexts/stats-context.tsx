import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { AppStats } from '../types';

interface StatsContextValue {
	stats: AppStats;
	refreshStats: () => void;
}

const StatsContext = createContext<StatsContextValue | null>(null);

export function StatsProvider({ children }: { children: React.ReactNode }) {
	const [stats, setStats] = useState<AppStats>({
		pageViews: 12453,
		activeUsers: 342,
		lastUpdated: Date.now(),
	});

	const refreshStats = useCallback(() => {
		setStats({
			pageViews: Math.floor(Math.random() * 100000),
			activeUsers: Math.floor(Math.random() * 1000),
			lastUpdated: Date.now(),
		});
	}, []);

	const value = useMemo(() => ({ stats, refreshStats }), [stats, refreshStats]);

	return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
}

export function useStats() {
	const context = useContext(StatsContext);
	if (!context) {
		throw new Error('useStats must be used within StatsProvider');
	}
	return context;
}

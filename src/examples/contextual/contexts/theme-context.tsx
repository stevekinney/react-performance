import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ThemeSettings } from '../types';

interface ThemeContextValue {
	theme: ThemeSettings;
	updateTheme: (updates: Partial<ThemeSettings>) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<ThemeSettings>({
		mode: 'light',
		primaryColor: '#3b82f6',
		fontSize: 'medium',
	});

	const updateTheme = useCallback((updates: Partial<ThemeSettings>) => {
		setTheme((prev) => ({ ...prev, ...updates }));
	}, []);

	const value = useMemo(() => ({ theme, updateTheme }), [theme, updateTheme]);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within ThemeProvider');
	}
	return context;
}

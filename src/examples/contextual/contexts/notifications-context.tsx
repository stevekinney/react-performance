import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { NotificationSettings } from '../types';

interface NotificationsContextValue {
	notifications: NotificationSettings;
	updateNotifications: (updates: Partial<NotificationSettings>) => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
	const [notifications, setNotifications] = useState<NotificationSettings>({
		email: true,
		push: false,
		sms: false,
	});

	const updateNotifications = useCallback((updates: Partial<NotificationSettings>) => {
		setNotifications((prev) => ({ ...prev, ...updates }));
	}, []);

	const value = useMemo(() => ({ notifications, updateNotifications }), [notifications, updateNotifications]);

	return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}

export function useNotifications() {
	const context = useContext(NotificationsContext);
	if (!context) {
		throw new Error('useNotifications must be used within NotificationsProvider');
	}
	return context;
}

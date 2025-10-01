import { createContext, useContext } from 'react';
import type { UserProfile } from '../types';

const UserContext = createContext<UserProfile | null>(null);

const defaultUser: UserProfile = {
	id: 1,
	name: 'Alex Johnson',
	email: 'alex@example.com',
	avatar: 'https://i.pravatar.cc/150?img=1',
};

export function UserProvider({ children }: { children: React.ReactNode }) {
	return <UserContext.Provider value={defaultUser}>{children}</UserContext.Provider>;
}

export function useUser() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within UserProvider');
	}
	return context;
}

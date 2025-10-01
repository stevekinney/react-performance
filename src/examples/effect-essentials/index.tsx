import { createRoot } from 'react-dom/client';
import Application from './application';

import '$styles/globals.css';

const root = document.getElementById('root');

if (root) {
	createRoot(root).render(<Application />);
}

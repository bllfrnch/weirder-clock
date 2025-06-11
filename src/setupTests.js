// Make sure vi is available globally for our mocks
import { vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Mock the browser's location object for SvelteKit
Object.defineProperty(window, 'location', {
	value: {
		href: 'http://localhost:3000',
		origin: 'http://localhost:3000',
		pathname: '/',
		search: '',
		hash: ''
	},
	writable: true
});

// Mock matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: vi.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: vi.fn(), // deprecated
		removeListener: vi.fn(), // deprecated
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	})),
}); 
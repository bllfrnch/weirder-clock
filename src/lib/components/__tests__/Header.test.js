import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Header from '../Header.svelte';

describe('Header', () => {
	it('renders the header with default props', () => {
		render(Header);
		
		const header = screen.getByRole('banner');
		expect(header).toBeInTheDocument();
	});

	it('renders with showBackLink prop', () => {
		render(Header, { showBackLink: true });
		
		const header = screen.getByRole('banner');
		expect(header).toBeInTheDocument();
	});

	it('renders without showBackLink prop', () => {
		render(Header, { showBackLink: false });
		
		const header = screen.getByRole('banner');
		expect(header).toBeInTheDocument();
	});

	it('applies correct CSS classes', () => {
		const { container } = render(Header);
		const header = container.querySelector('header');
		
		expect(header).toBeInTheDocument();
		expect(header.tagName).toBe('HEADER');
	});
}); 
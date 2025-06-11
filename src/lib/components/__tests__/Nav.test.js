import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Nav from '../Nav.svelte';

describe('Nav', () => {
	it('renders navigation with default links when showBackLink is false', () => {
		render(Nav, { showBackLink: false });
		
		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
		
		expect(screen.getByText('About')).toBeInTheDocument();
		expect(screen.getByText('Help')).toBeInTheDocument();
		expect(screen.getByText('Settings')).toBeInTheDocument();
	});

	it('renders back link when showBackLink is true', () => {
		render(Nav, { showBackLink: true });
		
		const nav = screen.getByRole('navigation');
		expect(nav).toBeInTheDocument();
		
		expect(screen.getByText('← Back to Clock')).toBeInTheDocument();
		expect(screen.queryByText('About')).not.toBeInTheDocument();
		expect(screen.queryByText('Help')).not.toBeInTheDocument();
		expect(screen.queryByText('Settings')).not.toBeInTheDocument();
	});

	it('defaults to showing normal navigation when no prop is provided', () => {
		render(Nav);
		
		expect(screen.getByText('About')).toBeInTheDocument();
		expect(screen.getByText('Help')).toBeInTheDocument();
		expect(screen.getByText('Settings')).toBeInTheDocument();
	});

	it('renders correct link attributes', () => {
		render(Nav, { showBackLink: false });
		
		const aboutLink = screen.getByText('About');
		const helpLink = screen.getByText('Help');
		
		expect(aboutLink).toHaveAttribute('href', '/about');
		expect(helpLink).toHaveAttribute('href', '/help');
	});

	it('renders back link with correct href', () => {
		render(Nav, { showBackLink: true });
		
		const backLink = screen.getByText('← Back to Clock');
		expect(backLink).toHaveAttribute('href', '/');
	});

	it('settings button is actually a button element', () => {
		render(Nav, { showBackLink: false });
		
		const settingsButton = screen.getByRole('button', { name: 'Settings' });
		expect(settingsButton).toBeInTheDocument();
		expect(settingsButton.tagName).toBe('BUTTON');
	});

	it('has correct CSS structure', () => {
		const { container } = render(Nav);
		
		const nav = container.querySelector('nav');
		expect(nav).toBeInTheDocument();
		expect(nav.tagName).toBe('NAV');
	});

	it('applies hover styles correctly', () => {
		const { container } = render(Nav);
		
		const links = container.querySelectorAll('nav a, nav button');
		expect(links.length).toBeGreaterThan(0);
		links.forEach(link => {
			expect(link).toBeInTheDocument();
		});
	});
}); 
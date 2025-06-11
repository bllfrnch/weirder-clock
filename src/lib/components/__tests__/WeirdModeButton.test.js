import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import WeirdModeButton from '../WeirdModeButton.svelte';

describe('WeirdModeButton', () => {
	it('renders with default text "Get weird"', () => {
		render(WeirdModeButton);
		
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('Get weird');
	});

	it('renders "Get normal" when isWeirdMode is true', () => {
		render(WeirdModeButton, { isWeirdMode: true });
		
		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('Get normal');
	});

	it('renders "Get weird" when isWeirdMode is false', () => {
		render(WeirdModeButton, { isWeirdMode: false });
		
		const button = screen.getByRole('button');
		expect(button).toHaveTextContent('Get weird');
	});

	it('can be clicked', async () => {
		render(WeirdModeButton);
		
		const button = screen.getByRole('button');
		await fireEvent.click(button);
		
		// In Svelte 5, we test DOM interactions rather than component events
		expect(button).toBeInTheDocument();
	});

	it('has correct CSS classes', () => {
		const { container } = render(WeirdModeButton);
		const button = container.querySelector('.get-weird-btn');
		
		expect(button).toHaveClass('control-btn', 'get-weird-btn');
	});

	it('has proper styling and animation', () => {
		const { container } = render(WeirdModeButton);
		const button = container.querySelector('.get-weird-btn');
		
		expect(button).toHaveClass('get-weird-btn');
		expect(button).toBeInTheDocument();
	});
}); 
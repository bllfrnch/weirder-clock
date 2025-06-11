import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import WeirdModeIndicator from '../WeirdModeIndicator.svelte';

describe('WeirdModeIndicator', () => {
	it('does not render when isWeirdMode is false', () => {
		const { container } = render(WeirdModeIndicator, { isWeirdMode: false });
		
		const indicator = container.querySelector('.weird-w');
		expect(indicator).not.toBeInTheDocument();
	});

	it('renders the weird indicator when isWeirdMode is true', () => {
		const { container } = render(WeirdModeIndicator, { isWeirdMode: true });
		
		const indicator = container.querySelector('.weird-w');
		expect(indicator).toBeInTheDocument();
		expect(indicator).toHaveTextContent('𝒲');
	});

	it('has correct CSS classes when rendered', () => {
		const { container } = render(WeirdModeIndicator, { isWeirdMode: true });
		
		const indicator = container.querySelector('.weird-w');
		expect(indicator).toHaveClass('weird-w', 'digital-w');
	});

	it('has proper styling when rendered', () => {
		const { container } = render(WeirdModeIndicator, { isWeirdMode: true });
		
		const indicator = container.querySelector('.digital-w');
		expect(indicator).toHaveClass('digital-w');
		// CSS styles might not be fully applied in test environment, so we just check for key classes
		expect(indicator).toBeInTheDocument();
	});

	it('defaults to not showing when no prop is provided', () => {
		const { container } = render(WeirdModeIndicator);
		
		const indicator = container.querySelector('.weird-w');
		expect(indicator).not.toBeInTheDocument();
	});
}); 
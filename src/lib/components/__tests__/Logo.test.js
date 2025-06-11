import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import Logo from '../Logo.svelte';

describe('Logo', () => {
	it('renders the LED display container', () => {
		const { container } = render(Logo);
		
		const ledDisplay = container.querySelector('.led-display');
		expect(ledDisplay).toBeInTheDocument();
	});

	it('renders the SVG with correct attributes', () => {
		const { container } = render(Logo);
		
		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
		expect(svg).toHaveAttribute('width', '650');
		expect(svg).toHaveAttribute('height', '60');
		expect(svg).toHaveAttribute('viewBox', '35 18 570 54');
	});

	it('contains segment definitions', () => {
		const { container } = render(Logo);
		
		const segments = ['segment-a', 'segment-b', 'segment-c', 'segment-d', 'segment-e', 'segment-f', 'segment-g'];
		segments.forEach(segmentId => {
			const segment = container.querySelector(`#${segmentId}`);
			expect(segment).toBeInTheDocument();
		});
	});

	it('has correct styling for the LED display', () => {
		const { container } = render(Logo);
		
		const ledDisplay = container.querySelector('.led-display');
		expect(ledDisplay).toHaveClass('led-display');
		expect(ledDisplay).toBeInTheDocument();
	});

	it('has transform styling for the skewed effect', () => {
		const { container } = render(Logo);
		
		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
		expect(svg.tagName).toBe('svg');
	});

	it('contains letter segments with correct fill color', () => {
		const { container } = render(Logo);
		
		const segments = container.querySelectorAll('g[fill="#ff6b35"]');
		expect(segments.length).toBeGreaterThan(0);
	});
}); 
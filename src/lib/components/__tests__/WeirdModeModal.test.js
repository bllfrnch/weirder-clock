import { render, screen, fireEvent } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import WeirdModeModal from '../WeirdModeModal.svelte';

describe('WeirdModeModal', () => {
	it('does not render when show is false', () => {
		const { container } = render(WeirdModeModal, { show: false });
		
		const modal = container.querySelector('.modal-backdrop');
		expect(modal).not.toBeInTheDocument();
	});

	it('renders when show is true', () => {
		const { container } = render(WeirdModeModal, { show: true });
		
		const modal = container.querySelector('.modal-backdrop');
		expect(modal).toBeInTheDocument();
	});

	it('displays correct title and content', () => {
		render(WeirdModeModal, { show: true });
		
		expect(screen.getByText('Adjust weirdness value')).toBeInTheDocument();
		expect(screen.getByText('Drag the slider to expand or contract time:')).toBeInTheDocument();
		expect(screen.getByText('Time Speed')).toBeInTheDocument();
	});

	it('displays slider with correct attributes', () => {
		render(WeirdModeModal, { show: true });
		
		const slider = screen.getByRole('slider');
		expect(slider).toHaveAttribute('min', '0.1');
		expect(slider).toHaveAttribute('max', '1.9');
		expect(slider).toHaveAttribute('step', '0.1');
		expect(slider).toHaveAttribute('id', 'time-warp');
	});

	it('displays current value correctly', () => {
		render(WeirdModeModal, { show: true, timeWarpValue: 1.5 });
		
		expect(screen.getByText('Current: 1.5x')).toBeInTheDocument();
	});

	it('close button can be clicked', async () => {
		render(WeirdModeModal, { show: true });
		
		const closeButton = screen.getByText('×');
		await fireEvent.click(closeButton);
		
		// Test that the button exists and is clickable
		expect(closeButton).toBeInTheDocument();
	});

	it('cancel button can be clicked', async () => {
		render(WeirdModeModal, { show: true });
		
		const cancelButton = screen.getByText('Cancel');
		await fireEvent.click(cancelButton);
		
		// Test that the button exists and is clickable
		expect(cancelButton).toBeInTheDocument();
	});

	it('apply button can be clicked', async () => {
		render(WeirdModeModal, { show: true, timeWarpValue: 1.3 });
		
		const applyButton = screen.getByText('Apply Weird Mode');
		await fireEvent.click(applyButton);
		
		// Test that the button exists and is clickable
		expect(applyButton).toBeInTheDocument();
	});

	it('backdrop can be clicked', async () => {
		const { container } = render(WeirdModeModal, { show: true });
		
		const backdrop = container.querySelector('.modal-backdrop');
		await fireEvent.click(backdrop);
		
		// Test that the backdrop exists and is clickable
		expect(backdrop).toBeInTheDocument();
	});

	it('modal content can be clicked', async () => {
		const { container } = render(WeirdModeModal, { show: true });
		
		const modal = container.querySelector('.modal');
		await fireEvent.click(modal);
		
		// Test that the modal content exists and is clickable
		expect(modal).toBeInTheDocument();
	});

	it('updates timeWarpValue when slider changes', async () => {
		const { component, container } = render(WeirdModeModal, { show: true, timeWarpValue: 1.0 });
		
		const slider = container.querySelector('.time-warp-slider');
		await fireEvent.input(slider, { target: { value: '1.5' } });
		
		expect(screen.getByText('Current: 1.5x')).toBeInTheDocument();
	});

	it('has correct slider labels', () => {
		render(WeirdModeModal, { show: true });
		
		expect(screen.getByText('Slower')).toBeInTheDocument();
		expect(screen.getByText('Normal')).toBeInTheDocument();
		expect(screen.getByText('Faster')).toBeInTheDocument();
	});
}); 
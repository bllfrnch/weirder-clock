<script>
	import { createEventDispatcher } from 'svelte';
	
	export let show = false;
	export let timeWarpValue = 1.0;
	
	const dispatch = createEventDispatcher();
	
	function closeModal() {
		dispatch('close');
	}
	
	function applyWeirdMode() {
		dispatch('apply', { timeWarpValue });
	}
	
	function handleBackdropClick() {
		closeModal();
	}
</script>

{#if show}
	<div class="modal-backdrop" on:click={handleBackdropClick}>
		<div class="modal" on:click|stopPropagation>
			<div class="modal-header">
				<h2>Adjust weirdness value</h2>
				<button class="modal-close" on:click={closeModal}>×</button>
			</div>
			<div class="modal-content">
				<p>Drag the slider to expand or contract time:</p>
				<div class="slider-container">
					<label for="time-warp">Time Speed</label>
					<input 
						id="time-warp"
						type="range" 
						min="0.1" 
						max="1.9" 
						step="0.1" 
						bind:value={timeWarpValue}
						class="time-warp-slider"
					/>
					<div class="slider-labels">
						<span>Slower</span>
						<span>Normal</span>
						<span>Faster</span>
					</div>
					<div class="current-value">
						Current: {timeWarpValue}x
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button class="control-btn secondary" on:click={closeModal}>
					Cancel
				</button>
				<button class="control-btn primary" on:click={applyWeirdMode}>
					Apply Weird Mode
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Modal styles */
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.8);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.modal {
		background: #1a1a1a;
		border: 2px solid #666;
		border-radius: 12px;
		max-width: 500px;
		width: 90%;
		max-height: 80vh;
		overflow: auto;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	}

	.modal-header h2 {
		color: #ccc;
		margin: 0;
		font-size: 1.5rem;
	}

	.modal-close {
		background: none;
		border: none;
		color: #aaa;
		font-size: 2rem;
		cursor: pointer;
		padding: 0;
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		transition: all 0.2s ease;
	}

	.modal-close:hover {
		background: rgba(255, 255, 255, 0.1);
		color: white;
	}

	.modal-content {
		padding: 2rem;
	}

	.modal-content p {
		color: rgba(255, 255, 255, 0.8);
		margin-bottom: 2rem;
	}

	.slider-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.slider-container label {
		color: #ccc;
		font-weight: 600;
		font-size: 1.1rem;
	}

	.time-warp-slider {
		width: 100%;
		height: 8px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.2);
		outline: none;
		appearance: none;
	}

	.time-warp-slider::-webkit-slider-thumb {
		appearance: none;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #888;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.time-warp-slider::-webkit-slider-thumb:hover {
		background: #aaa;
	}

	.time-warp-slider::-moz-range-thumb {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: #888;
		cursor: pointer;
		border: none;
		transition: background 0.2s ease;
	}

	.time-warp-slider::-moz-range-thumb:hover {
		background: #aaa;
	}

	.slider-labels {
		display: flex;
		justify-content: space-between;
		color: rgba(255, 255, 255, 0.6);
		font-size: 0.9rem;
	}

	.current-value {
		text-align: center;
		color: #ccc;
		font-weight: 600;
		font-size: 1.2rem;
	}

	.modal-footer {
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
		padding: 1.5rem;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
	}

	.control-btn {
		background: #333;
		color: white;
		border: none;
		padding: 0.75rem 1.5rem;
		border-radius: 8px;
		font-size: 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		min-width: 120px;
		font-family: inherit;
	}

	/* Modal button overrides */
	.modal-footer .control-btn.primary {
		background: #28a745;
		color: white;
		border-radius: 8px;
	}

	.modal-footer .control-btn.primary:hover:not(:disabled) {
		background: #34ce57;
		transform: none;
	}

	.modal-footer .control-btn.secondary {
		background: #dc3545;
		color: white;
		border-radius: 8px;
	}

	.modal-footer .control-btn.secondary:hover {
		background: #ff1744;
		transform: none;
	}
</style> 
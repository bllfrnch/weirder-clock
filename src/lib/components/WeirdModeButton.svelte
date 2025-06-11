<script>
	import { createEventDispatcher } from 'svelte';
	
	export let isWeirdMode = false;
	
	const dispatch = createEventDispatcher();
	
	function handleClick() {
		dispatch('click');
	}
</script>

<div class="get-weird-container">
	<button class="control-btn get-weird-btn" on:click={handleClick}>
		{isWeirdMode ? 'Get normal' : 'Get weird'}
	</button>
</div>

<style>
	.get-weird-container {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
	}

	.get-weird-btn {
		background: #dc3545;
		color: white;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 1px;
		border: none;
		padding: 1rem 2rem;
		border-radius: 8px;
		font-size: 1.1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		animation: redPulse 2s ease-in-out infinite;
	}

	.get-weird-btn:hover {
		background: #ff1744;
	}

	.get-weird-btn:active {
		transform: translateY(0);
	}

	@keyframes redPulse {
		0%, 100% { 
			background: #dc3545;
			transform: scale(1);
		}
		50% { 
			background: #ff1744;
			transform: scale(1.05);
		}
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
</style> 
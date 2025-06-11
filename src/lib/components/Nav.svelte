<script>
	export let showBackLink = false;
</script>

<nav>
	{#if showBackLink}
		<a href="/">← Back to Clock</a>
	{:else}
		<a href="/about">About</a>
		<a href="/help">Help</a>
		<button type="button">Settings</button>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		gap: 1rem;
	}

	nav a,
	nav button {
		color: white;
		text-decoration: none;
		font-weight: 500;
		border-radius: 8px;
		background: none;
		border: none;
		cursor: pointer;
		font-size: inherit;
		font-family: inherit;
		padding: 0.5rem 1rem;
		transition: all 0.2s ease;
	}

	nav a:hover,
	nav button:hover {
		background: rgba(255, 107, 53, 0.1);
	}

	nav a {
		color: #ff6b35;
	}

	@media (max-width: 768px) {
		nav {
			justify-content: center;
			flex-wrap: wrap;
		}
		
		nav a,
		nav button {
			font-size: 0.9rem;
			padding: 0.4rem 0.8rem;
		}
	}
</style> 
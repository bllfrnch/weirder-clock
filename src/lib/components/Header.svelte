<script>
	import Logo from './Logo.svelte';
	import Nav from './Nav.svelte';

	export let showBackLink = false;
</script>

<header>
	<Logo />
	<Nav {showBackLink} />
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin: 2rem;
	}

	@media (max-width: 768px) {
		header {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
			align-items: center;
			margin: 1rem;
		}
	}
</style> 
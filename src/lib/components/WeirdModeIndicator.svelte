<script>
	export let isWeirdMode = false;
</script>

{#if isWeirdMode}
	<span class="weird-w digital-w">𝒲</span>
{/if}

<style>
	.digital-w {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 2rem;
		color: #333;
		font-family: serif;
		font-style: italic;
		font-weight: bold;
	}
</style> 
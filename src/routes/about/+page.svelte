<script>
	import Header from '$lib/components/Header.svelte';
	// About page functionality if needed
</script>

<svelte:head>
	<title>About - Weird Clock</title>
	<meta name="description" content="About the Weird Clock - a modern twist on classic timepieces" />
</svelte:head>

<main>
	<Header showBackLink={true} />

	<div class="page-content">
		<div class="content">
			<article class="about-content">
				<h1>About Weird Clock</h1>

				<section>
					<h2>🌟 The Vision</h2>
					<p>Weird Clock is a modern reimagining of the classic timepiece. We wanted to create something that was both functional and visually striking—a clock that stands out while serving all your timing needs.</p>
				</section>

				<section>
					<h2>🔧 What Makes It Special</h2>
					<ul>
						<li><strong>Dual Mode Design:</strong> Switch between precise digital displays and elegant analog faces</li>
						<li><strong>Swiss-Inspired:</strong> Our analog clocks take inspiration from classic Swiss railway station clocks</li>
						<li><strong>LED Aesthetics:</strong> Digital modes feature authentic 7-segment LED styling with realistic glow effects</li>
						<li><strong>Complete Timing Suite:</strong> Clock, stopwatch, and countdown timer all in one place</li>
						<li><strong>Responsive:</strong> Works seamlessly across desktop, tablet, and mobile devices</li>
					</ul>
				</section>

				<section>
					<h2>🎨 Design Philosophy</h2>
					<p>We believe time should be beautiful. Every element—from the signature orange glow to the precise typography—has been carefully crafted to create a cohesive, engaging experience.</p>
					<p>The black background isn't just aesthetic; it reduces eye strain during extended use and makes the orange accents really pop. The skewed LED display adds character while maintaining readability.</p>
				</section>

				<section>
					<h2>🚀 Technology</h2>
					<p>Built with modern web technologies for a smooth, native-feeling experience:</p>
					<ul>
						<li><strong>SvelteKit:</strong> Fast, reactive framework for seamless interactions</li>
						<li><strong>SVG Graphics:</strong> Crisp, scalable visuals that look great on any screen</li>
						<li><strong>Pure CSS Animations:</strong> Smooth transitions and effects without external dependencies</li>
						<li><strong>Static Site Generation:</strong> Lightning-fast loading with pre-rendered pages</li>
					</ul>
				</section>

				<section>
					<h2>💡 The Name</h2>
					<p>Why "Weird Clock"? Because it's wonderfully different. It's not your typical timepiece—it's bold, modern, and unafraid to stand out. Sometimes the best things are a little weird.</p>
				</section>
			</article>
		</div>
	</div>

	<footer>
		<p>© {new Date().getFullYear()} - The Weird Clock Team</p>
	</footer>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: black;
		min-height: 100vh;
	}

	main {
		color: white;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.page-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.content {
		flex: 1;
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	.about-content {
		line-height: 1.6;
	}

	.about-content h1 {
		color: #ff6b35;
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.about-content h2 {
		color: #ff6b35;
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		border-bottom: 2px solid rgba(255, 107, 53, 0.3);
		padding-bottom: 0.5rem;
	}

	.about-content section {
		margin-bottom: 2rem;
	}

	.about-content p {
		margin-bottom: 1rem;
	}

	.about-content ul {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.about-content li {
		margin-bottom: 0.5rem;
	}

	.about-content strong {
		color: #ff6b35;
	}

	footer {
		text-align: center;
		padding: 1.5rem 2rem;
		opacity: 0.8;
		margin-top: auto;
	}

	@media (max-width: 1023px) {
		.content {
			padding: 1rem;
		}

		.about-content h1 {
			font-size: 2rem;
		}
	}
</style> 
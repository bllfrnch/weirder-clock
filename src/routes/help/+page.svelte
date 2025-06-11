<script>
	import Header from '$lib/components/Header.svelte';
	// Help page functionality if needed
</script>

<svelte:head>
	<title>Help - Weird Clock</title>
	<meta name="description" content="Learn how to use the Weird Clock - analog and digital clock, stopwatch, and timer features" />
</svelte:head>

<main>
	<Header showBackLink={true} />

	<div class="page-content">
		<div class="content">
			<article class="help-content">
				<h1>Help & User Guide</h1>

				<section>
					<h2>🕐 Clock</h2>
					<p>View the current time in both digital and analog formats.</p>
					<ul>
						<li><strong>Digital Mode:</strong> Shows time in HH:MM:SS format with LED-style glow effects</li>
						<li><strong>Analog Mode:</strong> Swiss railway-inspired clock face with smooth moving hands</li>
						<li><strong>Toggle:</strong> Use the Analog/Digital switch to change between modes</li>
					</ul>
				</section>

				<section>
					<h2>⏱️ Stopwatch</h2>
					<p>Precision timing for measuring elapsed time.</p>
					<ul>
						<li><strong>Digital Mode:</strong> Shows time in MM:SS.CC format (centiseconds)</li>
						<li><strong>Analog Mode:</strong> Three hands showing minutes, seconds, and centiseconds</li>
						<li><strong>Start/Stop:</strong> Click to start timing, click again to pause</li>
						<li><strong>Reset:</strong> Return to 00:00.00</li>
					</ul>
				</section>

				<section>
					<h2>⏲️ Timer</h2>
					<p>Countdown timer for tracking time remaining.</p>
					<ul>
						<li><strong>Digital Mode:</strong> Shows remaining time in MM:SS format</li>
						<li><strong>Analog Mode:</strong> Clock face with progress arc showing countdown</li>
						<li><strong>Set Time:</strong> Input minutes and seconds when timer is stopped</li>
						<li><strong>Warning:</strong> Progress arc turns red and pulses when &lt;20% time remains</li>
						<li><strong>Start/Pause:</strong> Begin countdown or pause temporarily</li>
						<li><strong>Reset:</strong> Clear timer and return to input mode</li>
					</ul>
				</section>

				<section>
					<h2>🎮 Controls</h2>
					<ul>
						<li><strong>Navigation:</strong> Click Clock, Stopwatch, or Timer tabs to switch views</li>
						<li><strong>Mode Toggle:</strong> Switch between Analog and Digital for each view</li>
						<li><strong>Responsive Design:</strong> Works on desktop, tablet, and mobile</li>
					</ul>
				</section>

				<section>
					<h2>💡 Tips</h2>
					<ul>
						<li>All analog clocks feature the same clean Swiss-style face design</li>
						<li>The LED header matches the orange accent color used throughout</li>
						<li>Digital displays use monospace fonts for precise alignment</li>
						<li>Timer inputs only appear when the timer is reset and stopped</li>
					</ul>
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

	.help-content {
		line-height: 1.6;
	}

	.help-content h1 {
		color: #ff6b35;
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.help-content h2 {
		color: #ff6b35;
		font-size: 1.5rem;
		margin-top: 2rem;
		margin-bottom: 1rem;
		border-bottom: 2px solid rgba(255, 107, 53, 0.3);
		padding-bottom: 0.5rem;
	}

	.help-content section {
		margin-bottom: 2rem;
	}

	.help-content ul {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	.help-content li {
		margin-bottom: 0.5rem;
	}

	.help-content strong {
		color: #ff6b35;
	}

	footer {
		text-align: center;
		padding: 1.5rem 2rem;
		opacity: 0.8;
		margin-top: auto;
	}

	@media (max-width: 768px) {
		.content {
			padding: 1rem;
		}

		.help-content h1 {
			font-size: 2rem;
		}
	}
</style> 
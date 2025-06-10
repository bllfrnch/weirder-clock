<script>
	import { onMount } from 'svelte';
	
	let isDigital = true;
	let time = new Date();

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => clearInterval(interval);
	});

	// Calculate hand angles
	$: hours = time.getHours() % 12;
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();
	
	$: hourAngle = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + minute adjustment
	$: minuteAngle = minutes * 6; // 6 degrees per minute
	$: secondAngle = seconds * 6; // 6 degrees per second
</script>

<svelte:head>
	<title>Weird Clock</title>
	<meta name="description" content="A beautiful static single-page application built with Svelte and Vite" />
</svelte:head>

<main>
	<header>
		<div class="led-display">
			<svg width="650" height="60" viewBox="0 15 650 60" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<!-- Define a single 7-segment digit template -->
					<g id="segment-a"><rect x="8" y="5" width="24" height="6" rx="2"/></g>
					<g id="segment-b"><rect x="32" y="8" width="6" height="24" rx="2"/></g>
					<g id="segment-c"><rect x="32" y="38" width="6" height="24" rx="2"/></g>
					<g id="segment-d"><rect x="8" y="59" width="24" height="6" rx="2"/></g>
					<g id="segment-e"><rect x="5" y="38" width="6" height="24" rx="2"/></g>
					<g id="segment-f"><rect x="5" y="8" width="6" height="24" rx="2"/></g>
					<g id="segment-g"><rect x="8" y="32" width="24" height="6" rx="2"/></g>
				</defs>

				<!-- W (using two character spaces to make a proper W) -->
				<!-- Left part of W (like an L) -->
				<g transform="translate(0, 10)" fill="#ff6b35">
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
                    <use href="#segment-c"/>
                    
				</g>
				<!-- Right part of W (like a backwards L) -->
				<g transform="translate(50, 10)" fill="#ff6b35">
					<use href="#segment-c"/>
					<use href="#segment-b"/>
					<use href="#segment-d"/>
				</g>

				<!-- E (segments: a,f,g,e,d) -->
				<g transform="translate(100, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-g"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
				</g>

				<!-- I (vertical line using middle segments) -->
				<g transform="translate(150, 10)" fill="#ff6b35">
					<use href="#segment-f"/>
					<use href="#segment-e"/>
				</g>

				<!-- R (segments: a,f,g,c,b,e) -->
				<g transform="translate(200, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-g"/>
					<use href="#segment-c"/>
					<use href="#segment-b"/>
					<use href="#segment-e"/>
				</g>

				<!-- D (segments: a,f,e,d,c,b) -->
				<g transform="translate(250, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
					<use href="#segment-c"/>
					<use href="#segment-b"/>
				</g>

				<!-- Space -->

				<!-- C (segments: a,f,e,d) -->
				<g transform="translate(330, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
				</g>

				<!-- L (segments: f,e,d) -->
				<g transform="translate(380, 10)" fill="#ff6b35">
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
				</g>

				<!-- O (segments: a,f,e,d,c,b) -->
				<g transform="translate(430, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
					<use href="#segment-c"/>
					<use href="#segment-b"/>
				</g>

				<!-- C (segments: a,f,e,d) -->
				<g transform="translate(480, 10)" fill="#ff6b35">
					<use href="#segment-a"/>
					<use href="#segment-f"/>
					<use href="#segment-e"/>
					<use href="#segment-d"/>
				</g>

				<!-- K (segments: f,g,e,c,b) -->
				<g transform="translate(530, 10)" fill="#ff6b35">
					<use href="#segment-f"/>
					<use href="#segment-g"/>
					<use href="#segment-e"/>
					<use href="#segment-c"/>
					<use href="#segment-b"/>
				</g>
			</svg>
		</div>
		<nav>
			<button type="button">About</button>
			<button type="button">Settings</button>
		</nav>
	</header>

	<nav class="sub-nav">
		<a href="#clock" class="active">Clock</a>
		<a href="#stopwatch">Stopwatch</a>
		<a href="#timer">Timer</a>
	</nav>

	<div class="mode-switch">
		<span class="mode-label" class:active={!isDigital}>Analog</span>
		<label class="switch">
			<input type="checkbox" bind:checked={isDigital}>
			<span class="slider"></span>
		</label>
		<span class="mode-label" class:active={isDigital}>Digital</span>
	</div>

	<!-- Main content area -->
	<main class="content">
		{#if isDigital}
			<div class="digital-clock">
				<div class="time-display">
					{time.toLocaleTimeString()}
				</div>
			</div>
		{:else}
			<div class="analog-clock">
				<svg viewBox="0 0 200 200" class="clock-face">
					<!-- Clock face -->
					<circle cx="100" cy="100" r="98" fill="white" stroke="#333" stroke-width="2"/>
					
					<!-- Hour markers -->
					{#each Array(12) as _, i}
						<line 
							x1="100" 
							y1="8" 
							x2="100" 
							y2="20" 
							stroke="#333" 
							stroke-width="3" 
							transform="rotate({i * 30} 100 100)"
						/>
					{/each}
					
					<!-- Minute markers -->
					{#each Array(60) as _, i}
						{#if i % 5 !== 0}
							<line 
								x1="100" 
								y1="8" 
								x2="100" 
								y2="14" 
								stroke="#666" 
								stroke-width="1" 
								transform="rotate({i * 6} 100 100)"
							/>
						{/if}
					{/each}
					
					<!-- Hour hand -->
					<line 
						x1="100" 
						y1="100" 
						x2="100" 
						y2="40" 
						stroke="#333" 
						stroke-width="6" 
						stroke-linecap="round"
						transform="rotate({hourAngle} 100 100)"
					/>
					
					<!-- Minute hand -->
					<line 
						x1="100" 
						y1="100" 
						x2="100" 
						y2="25" 
						stroke="#333" 
						stroke-width="4" 
						stroke-linecap="round"
						transform="rotate({minuteAngle} 100 100)"
					/>
					
					<!-- Second hand -->
					<line 
						x1="100" 
						y1="100" 
						x2="100" 
						y2="20" 
						stroke="#ff6b35" 
						stroke-width="2" 
						stroke-linecap="round"
						transform="rotate({secondAngle} 100 100)"
					/>
					
					<!-- Second hand circular tip -->
					<circle 
						cx="100" 
						cy="20" 
						r="4" 
						fill="#ff6b35"
						transform="rotate({secondAngle} 100 100)"
					/>
					
					<!-- Center dot -->
					<circle cx="100" cy="100" r="6" fill="#333"/>
				</svg>
			</div>
		{/if}
	</main>

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
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
        margin: 2rem;
	}

	.led-display svg {
		width: 100%;
		height: auto;
		max-width: 650px;
		filter: drop-shadow(0 0 3px #ff6b35) drop-shadow(0 0 16px #ff6b35);
		transform: skewX(-12deg);
	}

	.led-display rect {
		/* filter: drop-shadow(1px 1px 4px #ff6b35); */
	}

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
	}

	.sub-nav {
		display: flex;
		justify-content: center;
		gap: 3rem;
		margin: 2rem 0 3rem 0;
	}

	.sub-nav a {
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		font-size: 1.2rem;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		transition: all 0.2s ease;
		position: relative;
	}

	.sub-nav a:hover,
	.sub-nav a.active {
		color: #ff6b35;
	}

	.sub-nav a.active::after {
		content: '';
		position: absolute;
		bottom: -8px;
		left: 50%;
		transform: translateX(-50%);
		width: 30px;
		height: 2px;
		background: #ff6b35;
		border-radius: 1px;
	}


	.mode-switch {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin: 1rem 0 2rem 0;
	}

	.mode-label {
		color: rgba(255, 255, 255, 0.5);
		font-size: 1rem;
		font-weight: 500;
		transition: color 0.2s ease;
	}

	.mode-label.active {
		color: #ff6b35;
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 60px;
		height: 30px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.2);
		transition: 0.3s;
		border-radius: 30px;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 22px;
		width: 22px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		transition: 0.3s;
		border-radius: 50%;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	input:checked + .slider {
		background-color: #ff6b35;
		border-color: #ff6b35;
	}

	input:checked + .slider:before {
		transform: translateX(30px);
	}

	.content {
		margin-top: 2rem;
		min-height: 400px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.digital-clock {
		text-align: center;
	}

	.time-display {
		font-size: 4rem;
		font-weight: 300;
		color: #ff6b35;
		font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
		background: rgba(255, 107, 53, 0.1);
		padding: 2rem 3rem;
		border-radius: 20px;
		border: 2px solid rgba(255, 107, 53, 0.3);
		filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.3));
	}

	.analog-clock {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.clock-face {
		width: 300px;
		height: 300px;
		filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
	}

	footer {
		text-align: center;
		margin-top: 3rem;
		padding: 2rem;
		opacity: 0.8;
	}

	@media (max-width: 768px) {
		main {
			padding: 1rem;
		}
		
		header {
			flex-direction: column;
			gap: 1rem;
			text-align: center;
		}
		
		header h1 {
			font-size: 2rem;
		}
		
		nav {
			gap: 1rem;
		}
		
		nav a {
			font-size: 1rem;
			padding: 0.4rem 0.8rem;
		}
		
		section {
			padding: 1.5rem;
		}
		
		.add-todo {
			flex-direction: column;
		}
		
		.todo-item {
			flex-wrap: wrap;
		}
	}
</style>

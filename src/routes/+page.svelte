<script>
	import { onMount } from 'svelte';
	
	let isDigital = true;
	let time = new Date();
	let currentView = 'clock'; // 'clock', 'stopwatch', 'timer'
	
	// Stopwatch state
	let stopwatchTime = 0;
	let stopwatchRunning = false;
	let stopwatchInterval;
	
	// Timer state
	let timerMinutes = 5;
	let timerSeconds = 0;
	let timerRunning = false;
	let timerInterval;
	let timerTotalTime = 0;
	let timerInitialTime = 0;

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
			if (stopwatchInterval) clearInterval(stopwatchInterval);
			if (timerInterval) clearInterval(timerInterval);
		};
	});

	// Calculate hand angles for regular clock
	$: hours = time.getHours() % 12;
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();
	
	$: hourAngle = (hours * 30) + (minutes * 0.5); // 30 degrees per hour + minute adjustment
	$: minuteAngle = minutes * 6; // 6 degrees per minute
	$: secondAngle = seconds * 6; // 6 degrees per second

	// Calculate angles for stopwatch (showing elapsed time)
	$: stopwatchMinutes = Math.floor(stopwatchTime / 60000);
	$: stopwatchSecondsOnly = Math.floor((stopwatchTime % 60000) / 1000);
	$: stopwatchCentiseconds = Math.floor((stopwatchTime % 1000) / 10);
	
	$: stopwatchMinuteAngle = (stopwatchMinutes % 60) * 6; // 6 degrees per minute
	$: stopwatchSecondAngle = stopwatchSecondsOnly * 6; // 6 degrees per second
	$: stopwatchCentisecondAngle = stopwatchCentiseconds * 3.6; // 3.6 degrees per centisecond

	// Calculate angles for timer (showing remaining time)
	$: timerRemainingMinutes = Math.floor(timerTotalTime / 60000);
	$: timerRemainingSeconds = Math.floor((timerTotalTime % 60000) / 1000);
	$: timerMinuteAngle = (timerRemainingMinutes % 60) * 6;
	$: timerSecondAngle = timerRemainingSeconds * 6;
	$: timerProgress = timerInitialTime > 0 ? (timerInitialTime - timerTotalTime) / timerInitialTime : 0;

	// View switching
	function switchView(view) {
		currentView = view;
	}

	// Stopwatch functions
	function startStopwatch() {
		if (stopwatchRunning) {
			clearInterval(stopwatchInterval);
			stopwatchRunning = false;
		} else {
			stopwatchRunning = true;
			stopwatchInterval = setInterval(() => {
				stopwatchTime += 10;
			}, 10);
		}
	}

	function resetStopwatch() {
		clearInterval(stopwatchInterval);
		stopwatchRunning = false;
		stopwatchTime = 0;
	}

	function formatStopwatchTime(ms) {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		const centiseconds = Math.floor((ms % 1000) / 10);
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
	}

	// Timer functions
	function startTimer() {
		if (timerRunning) {
			clearInterval(timerInterval);
			timerRunning = false;
		} else {
			if (timerTotalTime === 0) {
				timerTotalTime = (timerMinutes * 60 + timerSeconds) * 1000;
				timerInitialTime = timerTotalTime;
			}
			timerRunning = true;
			timerInterval = setInterval(() => {
				timerTotalTime -= 1000;
				if (timerTotalTime <= 0) {
					clearInterval(timerInterval);
					timerRunning = false;
					timerTotalTime = 0;
					// You could add a notification or sound here
				}
			}, 1000);
		}
	}

	function resetTimer() {
		clearInterval(timerInterval);
		timerRunning = false;
		timerTotalTime = 0;
		timerInitialTime = 0;
	}

	function formatTimerTime(ms) {
		const totalSeconds = Math.max(0, Math.floor(ms / 1000));
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	$: displayTimerTime = timerTotalTime > 0 ? formatTimerTime(timerTotalTime) : `${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`;
</script>

<svelte:head>
	<title>Weird Clock</title>
	<meta name="description" content="A beautiful static single-page application built with Svelte and Vite" />
</svelte:head>

<main>
	<div class="page-content">
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
			<button 
				type="button" 
				class:active={currentView === 'clock'}
				on:click={() => switchView('clock')}
			>
				Clock
			</button>
			<button 
				type="button" 
				class:active={currentView === 'stopwatch'}
				on:click={() => switchView('stopwatch')}
			>
				Stopwatch
			</button>
			<button 
				type="button"
				class:active={currentView === 'timer'}
				on:click={() => switchView('timer')}
			>
				Timer
			</button>
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
			<div class="view-container">
				{#if currentView === 'clock'}
					<div class="view clock-view" class:digital={isDigital} class:analog={!isDigital}>
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
					</div>
				{:else if currentView === 'stopwatch'}
					<div class="view stopwatch-view">
						{#if isDigital}
							<div class="stopwatch-display">
								<div class="time-display large">
									{formatStopwatchTime(stopwatchTime)}
								</div>
								<div class="controls">
									<button 
										class="control-btn primary" 
										on:click={startStopwatch}
									>
										{stopwatchRunning ? 'Stop' : 'Start'}
									</button>
									<button 
										class="control-btn secondary" 
										on:click={resetStopwatch}
									>
										Reset
									</button>
								</div>
							</div>
						{:else}
							<div class="analog-stopwatch">
								<svg viewBox="0 0 200 200" class="stopwatch-face">
									<!-- Stopwatch face -->
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
									
									<!-- Minute hand (shows elapsed minutes) -->
									<line 
										x1="100" 
										y1="100" 
										x2="100" 
										y2="30" 
										stroke="#ff6b35" 
										stroke-width="4" 
										stroke-linecap="round"
										transform="rotate({stopwatchMinuteAngle} 100 100)"
									/>
									
									<!-- Second hand (shows elapsed seconds within current minute) -->
									<line 
										x1="100" 
										y1="100" 
										x2="100" 
										y2="20" 
										stroke="#333" 
										stroke-width="3" 
										stroke-linecap="round"
										transform="rotate({stopwatchSecondAngle} 100 100)"
									/>
									
									<!-- Centisecond hand (fast moving) -->
									<line 
										x1="100" 
										y1="100" 
										x2="100" 
										y2="15" 
										stroke="#ff6b35" 
										stroke-width="1" 
										stroke-linecap="round"
										transform="rotate({stopwatchCentisecondAngle} 100 100)"
										opacity="0.7"
									/>
									
									<!-- Center dot -->
									<circle cx="100" cy="100" r="6" fill="#333"/>
								</svg>
								<div class="controls">
									<button 
										class="control-btn primary" 
										on:click={startStopwatch}
									>
										{stopwatchRunning ? 'Stop' : 'Start'}
									</button>
									<button 
										class="control-btn secondary" 
										on:click={resetStopwatch}
									>
										Reset
									</button>
								</div>
							</div>
						{/if}
					</div>
				{:else if currentView === 'timer'}
					<div class="view timer-view">
						{#if isDigital}
							<div class="timer-display">
								<div class="time-display large">
									{displayTimerTime}
								</div>
								{#if !timerRunning && timerTotalTime === 0}
									<div class="timer-inputs">
										<div class="input-group">
											<label for="timer-minutes">Minutes</label>
											<input 
												id="timer-minutes"
												type="number" 
												bind:value={timerMinutes} 
												min="0" 
												max="59"
											/>
										</div>
										<div class="input-group">
											<label for="timer-seconds">Seconds</label>
											<input 
												id="timer-seconds"
												type="number" 
												bind:value={timerSeconds} 
												min="0" 
												max="59"
											/>
										</div>
									</div>
								{/if}
								<div class="controls">
									<button 
										class="control-btn primary" 
										on:click={startTimer}
										disabled={!timerRunning && timerMinutes === 0 && timerSeconds === 0}
									>
										{timerRunning ? 'Pause' : 'Start'}
									</button>
									<button 
										class="control-btn secondary" 
										on:click={resetTimer}
									>
										Reset
									</button>
								</div>
							</div>
						{:else}
							<div class="analog-timer">
								<svg viewBox="0 0 200 200" class="timer-face">
									<!-- Timer face -->
									<circle cx="100" cy="100" r="98" fill="white" stroke="#333" stroke-width="2"/>
									
									<!-- Progress arc background -->
									<circle 
										cx="100" 
										cy="100" 
										r="85" 
										fill="none" 
										stroke="rgba(255, 107, 53, 0.2)" 
										stroke-width="8"
									/>
									
									<!-- Progress arc (countdown) -->
									<circle 
										cx="100" 
										cy="100" 
										r="85" 
										fill="none" 
										stroke="#ff6b35" 
										stroke-width="8"
										stroke-linecap="round"
										stroke-dasharray="{534.07}" 
										stroke-dashoffset="{534.07 * (1 - timerProgress)}"
										transform="rotate(-90 100 100)"
										class:timer-warning={timerProgress > 0.8}
									/>
									
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
									
									<!-- Minute hand (shows remaining minutes) -->
									<line 
										x1="100" 
										y1="100" 
										x2="100" 
										y2="40" 
										stroke="#333" 
										stroke-width="4" 
										stroke-linecap="round"
										transform="rotate({timerMinuteAngle} 100 100)"
									/>
									
									<!-- Second hand (shows remaining seconds) -->
									<line 
										x1="100" 
										y1="100" 
										x2="100" 
										y2="25" 
										stroke="#ff6b35" 
										stroke-width="3" 
										stroke-linecap="round"
										transform="rotate({timerSecondAngle} 100 100)"
									/>
									
									<!-- Center dot -->
									<circle cx="100" cy="100" r="6" fill="#333"/>
								</svg>
								
								{#if !timerRunning && timerTotalTime === 0}
									<div class="timer-inputs">
										<div class="input-group">
											<label for="timer-minutes-analog">Minutes</label>
											<input 
												id="timer-minutes-analog"
												type="number" 
												bind:value={timerMinutes} 
												min="0" 
												max="59"
											/>
										</div>
										<div class="input-group">
											<label for="timer-seconds-analog">Seconds</label>
											<input 
												id="timer-seconds-analog"
												type="number" 
												bind:value={timerSeconds} 
												min="0" 
												max="59"
											/>
										</div>
									</div>
								{/if}
								
								<div class="controls">
									<button 
										class="control-btn primary" 
										on:click={startTimer}
										disabled={!timerRunning && timerMinutes === 0 && timerSeconds === 0}
									>
										{timerRunning ? 'Pause' : 'Start'}
									</button>
									<button 
										class="control-btn secondary" 
										on:click={resetTimer}
									>
										Reset
									</button>
								</div>
							</div>
						{/if}
					</div>
				{/if}
			</div>
		</main>
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

	:global(html) {
		height: 100%;
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

	.sub-nav button {
		color: rgba(255, 255, 255, 0.7);
		text-decoration: none;
		font-size: 1.2rem;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 8px;
		transition: all 0.2s ease;
		position: relative;
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
	}

	.sub-nav button:hover,
	.sub-nav button.active {
		color: #ff6b35;
	}

	.sub-nav button.active::after {
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
		margin: 0.5rem 0 1rem 0;
		transition: opacity 0.3s ease, transform 0.3s ease;
	}

	.mode-switch.hidden {
		opacity: 0;
		transform: translateY(-10px);
		pointer-events: none;
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
		margin-top: 0.5rem;
		min-height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.view-container {
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.view {
		display: flex;
		justify-content: center;
		align-items: center;
		animation: slideIn 0.5s ease-out;
		opacity: 1;
		transform: translateX(0);
	}

	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateX(30px);
		}
		to {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.digital-clock {
		text-align: center;
	}

	.time-display {
		font-size: 5rem;
		font-weight: 300;
		color: #ff6b35;
		font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
		background: rgba(255, 107, 53, 0.1);
		padding: 2rem 3rem;
		border-radius: 20px;
		border: 2px solid rgba(255, 107, 53, 0.3);
		filter: drop-shadow(0 0 20px rgba(255, 107, 53, 0.3));
		margin-bottom: 2rem;
	}

	.time-display.large {
		font-size: 5rem;
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

	.stopwatch-view,
	.timer-view {
		text-align: center;
		width: 100%;
	}

	.stopwatch-display,
	.timer-display {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.controls {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
	}

	.control-btn {
		padding: 1rem 2rem;
		border: none;
		border-radius: 12px;
		font-size: 1.1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		min-width: 120px;
		font-family: inherit;
	}

	.control-btn.primary {
		background: #ff6b35;
		color: white;
		box-shadow: 0 4px 15px rgba(255, 107, 53, 0.4);
	}

	.control-btn.primary:hover:not(:disabled) {
		background: #ff5722;
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(255, 107, 53, 0.6);
	}

	.control-btn.secondary {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.control-btn.secondary:hover {
		background: rgba(255, 255, 255, 0.2);
		transform: translateY(-2px);
	}

	.control-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.timer-inputs {
		display: flex;
		gap: 2rem;
		margin-bottom: 2rem;
		justify-content: center;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.input-group label {
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.9rem;
		font-weight: 500;
	}

	.input-group input {
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 8px;
		padding: 0.75rem 1rem;
		color: white;
		font-size: 1.1rem;
		text-align: center;
		width: 80px;
		font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
	}

	.input-group input:focus {
		outline: none;
		border-color: #ff6b35;
		box-shadow: 0 0 0 2px rgba(255, 107, 53, 0.2);
	}

	footer {
		text-align: center;
		padding: 1.5rem 2rem;
		opacity: 0.8;
		margin-top: auto;
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
		
		.led-display svg {
			max-width: 100%;
		}
		
		nav {
			gap: 1rem;
		}
		
		nav a,
		nav button {
			font-size: 1rem;
			padding: 0.4rem 0.8rem;
		}
		
		.sub-nav {
			gap: 2rem;
		}
		
		.sub-nav button {
			font-size: 1rem;
			padding: 0.4rem 0.8rem;
		}
		
		.time-display {
			font-size: 2.5rem;
			padding: 1.5rem 2rem;
		}
		
		.time-display.large {
			font-size: 3rem;
		}
		
		.clock-face,
		.stopwatch-face,
		.timer-face {
			width: 250px;
			height: 250px;
		}
		
		.controls {
			flex-direction: column;
			gap: 1rem;
		}
		
		.control-btn {
			padding: 0.8rem 1.5rem;
			font-size: 1rem;
			min-width: 140px;
		}
		
		.timer-inputs {
			gap: 1rem;
		}
		
		.input-group input {
			width: 70px;
			padding: 0.6rem 0.8rem;
		}
	}

	.analog-stopwatch,
	.analog-timer {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		text-align: center;
		width: 100%;
	}

	.stopwatch-face,
	.timer-face {
		width: 300px;
		height: 300px;
		filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
	}

	.timer-warning {
		stroke: #ff3333 !important;
		animation: pulse 1s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}
</style>

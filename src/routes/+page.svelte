<script>
	import { onMount, onDestroy } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import WeirdModeButton from '$lib/components/WeirdModeButton.svelte';
	import WeirdModeModal from '$lib/components/WeirdModeModal.svelte';
	import WeirdModeIndicator from '$lib/components/WeirdModeIndicator.svelte';
	
	let isDigital = true;
	let time = new Date();
	let currentView = 'clock'; // 'clock', 'stopwatch', 'timer'
	
	// Weird mode state
	let isWeirdMode = false;
	let showWeirdModal = false;
	let timeWarpValue = 1; // 1 = normal, <1 = slower, >1 = faster

	// Weird time tracking
	let weirdModeStartTime = null;
	let weirdModeStartRealTime = null;
	
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

	let clockInterval;

	onMount(() => {
		const interval = setInterval(() => {
			if (isWeirdMode && weirdModeStartTime && weirdModeStartRealTime) {
				// Calculate how much real time has passed since weird mode started
				const realTimeElapsed = Date.now() - weirdModeStartRealTime;
				// Calculate how much weird time should have passed
				const warpedTimeElapsed = realTimeElapsed * timeWarpValue;
				// Set displayed time to start time + warped elapsed time
				time = new Date(weirdModeStartTime.getTime() + warpedTimeElapsed);
			} else {
				// Normal mode - just show current time
				time = new Date();
			}
		}, 10); // Update more frequently for smoother animation

		return () => {
			clearInterval(interval);
			if (stopwatchInterval) clearInterval(stopwatchInterval);
			if (timerInterval) clearInterval(timerInterval);
		};
	});

	// Reset weird time when entering/exiting weird mode
	$: if (typeof window !== 'undefined') {
		if (isWeirdMode && !weirdModeStartTime) {
			// Entering weird mode - capture current time as start point
			weirdModeStartTime = new Date();
			weirdModeStartRealTime = Date.now();
		} else if (!isWeirdMode) {
			// Exiting weird mode - reset
			weirdModeStartTime = null;
			weirdModeStartRealTime = null;
		}
	}

	// Reactive clock interval - restart when weird mode or timeWarpValue changes
	$: if (typeof window !== 'undefined') {
		// Explicitly depend on these variables to trigger reactivity
		void isWeirdMode;
		void timeWarpValue;
	}

	// Reactive updates when timeWarpValue changes
	$: if (typeof window !== 'undefined' && stopwatchRunning) {
		// Restart stopwatch with new warp value
		clearInterval(stopwatchInterval);
		stopwatchInterval = setInterval(() => {
			const increment = isWeirdMode ? 10 * timeWarpValue : 10;
			stopwatchTime += increment;
		}, 10);
	}

	$: if (typeof window !== 'undefined' && timerRunning) {
		// Restart timer with new warp value
		clearInterval(timerInterval);
		timerInterval = setInterval(() => {
			const decrement = isWeirdMode ? 1000 * timeWarpValue : 1000;
			timerTotalTime -= decrement;
			if (timerTotalTime <= 0) {
				clearInterval(timerInterval);
				timerRunning = false;
				timerTotalTime = 0;
			}
		}, 1000);
	}

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
				// Normal 10ms intervals, but increment by warped amount
				const increment = isWeirdMode ? 10 * timeWarpValue : 10;
				stopwatchTime += increment;
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
				// Normal 1000ms intervals, but decrement by warped amount
				const decrement = isWeirdMode ? 1000 * timeWarpValue : 1000;
				timerTotalTime -= decrement;
				if (timerTotalTime <= 0) {
					clearInterval(timerInterval);
					timerRunning = false;
					timerTotalTime = 0;
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

	// Weird mode functions
	function getWeird() {
		if (isWeirdMode) {
			// Return to normal mode
			isWeirdMode = false;
			timeWarpValue = 1;
		} else {
			// Open the weird modal with default value
			timeWarpValue = 1;
			showWeirdModal = true;
		}
	}

	function applyWeirdMode() {
		isWeirdMode = true;
		showWeirdModal = false;
	}

	function handleApplyWeirdMode(event) {
		timeWarpValue = event.detail.timeWarpValue;
		isWeirdMode = true;
		showWeirdModal = false;
	}

	function closeWeirdModal() {
		showWeirdModal = false;
	}
</script>

<svelte:head>
	<title>Weird Clock</title>
	<meta name="description" content="A beautiful static single-page application built with Svelte and Vite" />
</svelte:head>

<main>
	<div class="page-content">
		<Header />

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
									<WeirdModeIndicator {isWeirdMode} />
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
									
									<!-- Fancy script W when in weird mode (behind hands) -->
									{#if isWeirdMode}
										<text 
											x="100" 
											y="150" 
											text-anchor="middle" 
											font-family="serif" 
											font-style="italic" 
											font-weight="bold" 
											font-size="24" 
											fill="#ccc"
										>
											𝒲
										</text>
									{/if}
									
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
						
						<!-- Get weird button -->
						<WeirdModeButton {isWeirdMode} on:click={getWeird} />
					</div>
				{:else if currentView === 'stopwatch'}
					<div class="view stopwatch-view">
						{#if isDigital}
							<div class="stopwatch-display">
								<div class="time-display large">
									{formatStopwatchTime(stopwatchTime)}
									<WeirdModeIndicator {isWeirdMode} />
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
								<!-- Get weird button -->
								<WeirdModeButton {isWeirdMode} on:click={getWeird} />
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
									
									<!-- Fancy script W when in weird mode (behind hands) -->
									{#if isWeirdMode}
										<text 
											x="100" 
											y="150" 
											text-anchor="middle" 
											font-family="serif" 
											font-style="italic" 
											font-weight="bold" 
											font-size="24" 
											fill="#ccc"
										>
											𝒲
										</text>
									{/if}
									
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
								<!-- Get weird button -->
								<WeirdModeButton {isWeirdMode} on:click={getWeird} />
							</div>
						{/if}
					</div>
				{:else if currentView === 'timer'}
					<div class="view timer-view">
						{#if isDigital}
							<div class="timer-display">
								<div class="time-display large">
									{displayTimerTime}
									<WeirdModeIndicator {isWeirdMode} />
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
								<!-- Get weird button -->
								<WeirdModeButton {isWeirdMode} on:click={getWeird} />
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
									
									<!-- Fancy script W when in weird mode (behind hands) -->
									{#if isWeirdMode}
										<text 
											x="100" 
											y="150" 
											text-anchor="middle" 
											font-family="serif" 
											font-style="italic" 
											font-weight="bold" 
											font-size="24" 
											fill="#ccc"
										>
											𝒲
										</text>
									{/if}
									
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
								<!-- Get weird button -->
								<WeirdModeButton {isWeirdMode} on:click={getWeird} />
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

	<!-- Weird Mode Modal -->
	<WeirdModeModal 
		show={showWeirdModal} 
		bind:timeWarpValue 
		on:close={closeWeirdModal}
		on:apply={handleApplyWeirdMode}
	/>
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

	.sub-nav {
		display: flex;
		justify-content: center;
		gap: 3rem;
		margin: 1rem 0 1.5rem 0;
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

	.clock-view {
		flex-direction: column;
		gap: 2rem;
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
		background: #28a745;
		color: white;
	}

	.control-btn.primary:hover:not(:disabled) {
		background: #34ce57;
	}

	.control-btn.secondary {
		background: rgba(255, 255, 255, 0.1);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.control-btn.secondary:hover {
		background: rgba(255, 255, 255, 0.2);
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
	}

	footer {
		text-align: center;
		padding: 1.5rem 2rem;
		opacity: 0.8;
		margin-top: auto;
	}

	@media (max-width: 1023px) {
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
	}

	.timer-warning {
		stroke: #ff3333 !important;
		animation: pulse 1s infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	/* Get weird button styles */
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
		/* No transform on active state */
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

	/* Weird W styling */
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

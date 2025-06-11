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

<style>
	.led-display svg {
		width: 100%;
		height: auto;
		max-width: 650px;
		filter: drop-shadow(0 0 3px #ff6b35) drop-shadow(0 0 16px #ff6b35);
		transform: skewX(-12deg);
	}
</style> 
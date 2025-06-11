/**
 * Format milliseconds for stopwatch display
 * @param {number} ms - Milliseconds to format
 * @returns {string} Formatted time string (MM:SS.CC)
 */
export function formatStopwatchTime(ms) {
	const minutes = Math.floor(ms / 60000);
	const seconds = Math.floor((ms % 60000) / 1000);
	const centiseconds = Math.floor((ms % 1000) / 10);
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

/**
 * Format milliseconds for timer display
 * @param {number} ms - Milliseconds to format
 * @returns {string} Formatted time string (MM:SS)
 */
export function formatTimerTime(ms) {
	const totalSeconds = Math.max(0, Math.floor(ms / 1000));
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Calculate clock hand angles for analog display
 * @param {Date} time - Time object to calculate angles for
 * @returns {Object} Object with hourAngle, minuteAngle, and secondAngle properties
 */
export function calculateClockAngles(time) {
	const hours = time.getHours() % 12;
	const minutes = time.getMinutes();
	const seconds = time.getSeconds();
	
	return {
		hourAngle: (hours * 30) + (minutes * 0.5), // 30 degrees per hour + minute adjustment
		minuteAngle: minutes * 6, // 6 degrees per minute
		secondAngle: seconds * 6 // 6 degrees per second
	};
}

/**
 * Calculate time warp increment/decrement based on weird mode settings
 * @param {boolean} isWeirdMode - Whether weird mode is active
 * @param {number} timeWarpValue - Time warp multiplier
 * @param {number} baseIncrement - Base increment/decrement value
 * @returns {number} Adjusted increment/decrement value
 */
export function calculateTimeWarpIncrement(isWeirdMode, timeWarpValue, baseIncrement) {
	return isWeirdMode ? baseIncrement * timeWarpValue : baseIncrement;
} 
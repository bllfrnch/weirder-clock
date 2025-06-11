import { describe, it, expect } from 'vitest';
import { 
	formatStopwatchTime, 
	formatTimerTime, 
	calculateClockAngles, 
	calculateTimeWarpIncrement 
} from '../utils.js';

describe('formatStopwatchTime', () => {
	it('formats zero milliseconds correctly', () => {
		expect(formatStopwatchTime(0)).toBe('00:00.00');
	});

	it('formats seconds correctly', () => {
		expect(formatStopwatchTime(5500)).toBe('00:05.50');
	});

	it('formats minutes correctly', () => {
		expect(formatStopwatchTime(125500)).toBe('02:05.50');
	});

	it('formats large times correctly', () => {
		expect(formatStopwatchTime(3725990)).toBe('62:05.99');
	});

	it('formats exactly one minute correctly', () => {
		expect(formatStopwatchTime(60000)).toBe('01:00.00');
	});

	it('handles centiseconds correctly', () => {
		expect(formatStopwatchTime(1050)).toBe('00:01.05');
		expect(formatStopwatchTime(1999)).toBe('00:01.99');
	});
});

describe('formatTimerTime', () => {
	it('formats zero milliseconds correctly', () => {
		expect(formatTimerTime(0)).toBe('00:00');
	});

	it('formats negative values as zero', () => {
		expect(formatTimerTime(-1000)).toBe('00:00');
	});

	it('formats seconds correctly', () => {
		expect(formatTimerTime(30000)).toBe('00:30');
	});

	it('formats minutes correctly', () => {
		expect(formatTimerTime(125000)).toBe('02:05');
	});

	it('formats large times correctly', () => {
		expect(formatTimerTime(3725000)).toBe('62:05');
	});

	it('rounds down partial seconds', () => {
		expect(formatTimerTime(30999)).toBe('00:30');
	});

	it('handles exactly one minute correctly', () => {
		expect(formatTimerTime(60000)).toBe('01:00');
	});
});

describe('calculateClockAngles', () => {
	it('calculates angles for 12:00:00 correctly', () => {
		const time = new Date('2023-01-01T12:00:00');
		const angles = calculateClockAngles(time);
		
		expect(angles.hourAngle).toBe(0);
		expect(angles.minuteAngle).toBe(0);
		expect(angles.secondAngle).toBe(0);
	});

	it('calculates angles for 3:15:30 correctly', () => {
		const time = new Date('2023-01-01T03:15:30');
		const angles = calculateClockAngles(time);
		
		expect(angles.hourAngle).toBe(97.5); // 3 * 30 + 15 * 0.5
		expect(angles.minuteAngle).toBe(90); // 15 * 6
		expect(angles.secondAngle).toBe(180); // 30 * 6
	});

	it('calculates angles for 6:30:45 correctly', () => {
		const time = new Date('2023-01-01T06:30:45');
		const angles = calculateClockAngles(time);
		
		expect(angles.hourAngle).toBe(195); // 6 * 30 + 30 * 0.5
		expect(angles.minuteAngle).toBe(180); // 30 * 6
		expect(angles.secondAngle).toBe(270); // 45 * 6
	});

	it('handles 24-hour format correctly (converts to 12-hour)', () => {
		const time = new Date('2023-01-01T15:30:00'); // 3:30 PM
		const angles = calculateClockAngles(time);
		
		expect(angles.hourAngle).toBe(105); // (15 % 12) * 30 + 30 * 0.5 = 3 * 30 + 15
	});

	it('handles midnight correctly', () => {
		const time = new Date('2023-01-01T00:00:00');
		const angles = calculateClockAngles(time);
		
		expect(angles.hourAngle).toBe(0);
		expect(angles.minuteAngle).toBe(0);
		expect(angles.secondAngle).toBe(0);
	});
});

describe('calculateTimeWarpIncrement', () => {
	it('returns base increment when weird mode is off', () => {
		const result = calculateTimeWarpIncrement(false, 1.5, 10);
		expect(result).toBe(10);
	});

	it('returns warped increment when weird mode is on', () => {
		const result = calculateTimeWarpIncrement(true, 1.5, 10);
		expect(result).toBe(15);
	});

	it('handles slow time warp correctly', () => {
		const result = calculateTimeWarpIncrement(true, 0.5, 100);
		expect(result).toBe(50);
	});

	it('handles fast time warp correctly', () => {
		const result = calculateTimeWarpIncrement(true, 2.0, 100);
		expect(result).toBe(200);
	});

	it('handles zero base increment', () => {
		const result = calculateTimeWarpIncrement(true, 1.5, 0);
		expect(result).toBe(0);
	});

	it('handles decimal time warp values', () => {
		const result = calculateTimeWarpIncrement(true, 1.25, 80);
		expect(result).toBe(100);
	});
}); 
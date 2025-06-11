# Testing Guide

This project uses **Vitest** with **@testing-library/svelte** for comprehensive testing of Svelte components and utilities.

## Test Setup

The testing configuration includes:
- **Vitest** as the test runner
- **@testing-library/svelte** for component testing
- **@testing-library/jest-dom** for additional DOM matchers
- **jsdom** environment for simulating browser DOM
- **Svelte Testing Plugin** for proper Svelte 5 compatibility

## Running Tests

```bash
# Run all tests once
npm run test:run

# Run tests in watch mode (during development)
npm test

# Run specific test files
npm run test:run -- src/lib/__tests__/utils.test.js
```

## Test Structure

### Component Tests
Location: `src/lib/components/__tests__/`

Tests cover:
- **Rendering**: Components render correctly with different props
- **DOM Structure**: Correct HTML elements and classes are present
- **User Interactions**: Buttons can be clicked, forms can be submitted
- **Conditional Rendering**: Components show/hide based on props

### Utility Tests
Location: `src/lib/__tests__/`

Tests cover:
- **Time Formatting**: Stopwatch and timer display formatting
- **Clock Calculations**: Hour/minute/second hand angle calculations
- **Time Warp Logic**: Speed adjustment calculations

## Test Coverage

Current test coverage includes:
- ✅ **67 passing tests** across all components and utilities
- ✅ **Header Component**: Navigation and layout rendering
- ✅ **Logo Component**: LED display SVG rendering
- ✅ **Navigation Component**: Link and button interactions
- ✅ **WeirdModeButton**: Button state and text changes
- ✅ **WeirdModeIndicator**: Conditional visibility and styling
- ✅ **WeirdModeModal**: Modal rendering, form controls, and interactions
- ✅ **Utility Functions**: Time formatting and calculation logic

## Svelte 5 Compatibility

The tests are designed for **Svelte 5** and avoid deprecated patterns:
- ❌ No `$on` event listeners (deprecated in Svelte 5)
- ✅ DOM-based interaction testing instead
- ✅ Component rendering and prop validation
- ✅ User interaction simulation with `fireEvent`

## Writing New Tests

### Component Test Example
```javascript
import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import MyComponent from '../MyComponent.svelte';

describe('MyComponent', () => {
  it('renders with correct text', () => {
    render(MyComponent, { props: { title: 'Hello' } });
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Utility Function Test Example
```javascript
import { describe, it, expect } from 'vitest';
import { myUtilFunction } from '../utils.js';

describe('myUtilFunction', () => {
  it('returns expected result', () => {
    expect(myUtilFunction(input)).toBe(expectedOutput);
  });
});
```

## Best Practices

1. **Test behavior, not implementation**: Focus on what the user sees and does
2. **Use descriptive test names**: Make it clear what scenario is being tested
3. **Test edge cases**: Include boundary conditions and error states
4. **Keep tests isolated**: Each test should be independent
5. **Use appropriate matchers**: `toBeInTheDocument()`, `toHaveTextContent()`, etc.

## Debugging Tests

- Use `screen.debug()` to see rendered HTML
- Run tests in watch mode for rapid feedback
- Use `--reporter=verbose` for detailed test output
- Check browser DevTools for component inspection during development 
// setupTests.js
global.console = {
    ...console,
    error: jest.fn(), // Espía de console.error
};

// Test script for Baniya
// Runs tests across the monorepo

const { execSync } = require('child_process');

console.log('Running tests for Baniya monorepo...');

try {
  // Run test script for all packages and apps
  execSync('pnpm -r test', { stdio: 'inherit' });
  console.log('Tests completed successfully!');
} catch (error) {
  console.error('Tests failed:', error.message);
  process.exit(1);
}
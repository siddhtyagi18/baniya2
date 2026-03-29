// Build script for Baniya
// Builds all packages and apps

const { execSync } = require('child_process');

console.log('Building Baniya monorepo...');

try {
  // Run build script for all packages and apps
  execSync('pnpm -r build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
// Development script for Baniya
// Runs both server and editor in development mode

const { exec } = require('child_process');
const concurrently = require('concurrently');

console.log('Starting Baniya development servers...');

// Run both server and editor development scripts concurrently
concurrently([
  {
    command: 'pnpm --filter @baniya/server dev',
    name: 'SERVER',
    prefixColor: 'blue.bold',
  },
  {
    command: 'pnpm --filter @baniya/editor dev',
    name: 'EDITOR',
    prefixColor: 'green.bold',
  }
], {
  // Kill all processes if one dies
  killOthers: ['failure', 'success'],
  // Restart if one fails
  restartTries: 3
}).then(result => {
  console.log('All processes have exited');
  process.exit(result.result.constructor === Object && Object.values(result.result).every(code => code === 0) ? 0 : 1);
}).catch(err => {
  console.error('Failed to start development servers:', err);
  process.exit(1);
});
/**
 * Health check script for Docker container
 * This script checks if the application is running and responsive
 */

const http = require('http');
const process = require('process');

const options = {
  host: 'localhost',
  port: process.env.PORT || 3000,
  path: '/health',
  timeout: 2000,
  method: 'GET',
};

const request = http.request(options, res => {
  console.log(`Health check status: ${res.statusCode}`);

  if (res.statusCode === 200) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});

request.on('error', error => {
  console.error('Health check failed:', error.message);
  process.exit(1);
});

request.on('timeout', () => {
  console.error('Health check timeout');
  request.destroy();
  process.exit(1);
});

request.setTimeout(options.timeout);
request.end();

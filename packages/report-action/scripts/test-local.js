#!/usr/bin/env node

// Quick local test script for Canyon Report Action
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Canyon Report Action locally...');

// Mock environment for commit mode
process.env.GITHUB_EVENT_NAME = 'push';
process.env.GITHUB_REPOSITORY = 'canyonjs/report';

// Set inputs
process.env.INPUT_MODE = 'commit';
process.env.INPUT_BASE = 'HEAD~1';
process.env.INPUT_HEAD = 'HEAD';
process.env.INPUT_OUTPUT = 'test-output.json';

try {
  // Build first
  console.log('📦 Building...');
  execSync('npm run build', { stdio: 'inherit', cwd: __dirname + '/..' });
  
  // Run the action
  console.log('🚀 Running action...');
  require('../dist/index.js');
  
  // Check output
  const outputPath = path.join(__dirname, '..', 'test-output.json');
  if (fs.existsSync(outputPath)) {
    console.log('✅ Success! Generated patch:');
    const patch = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
    console.log(JSON.stringify(patch, null, 2));
  } else {
    console.log('❌ No output file generated');
  }
  
} catch (error) {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
}
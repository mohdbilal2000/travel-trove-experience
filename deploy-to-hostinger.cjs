#!/usr/bin/env node

/**
 * Hostinger Deployment Preparation Script
 * Prepares Next.js standalone build for Hostinger upload
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Preparing Guide India Tours for Hostinger deployment...\n');

// Step 1: Check if standalone build exists
const standalonePath = path.join(__dirname, '.next', 'standalone');
if (!fs.existsSync(standalonePath)) {
    console.log('No standalone build found. Building now...\n');
    try {
        execSync('npm run build', { stdio: 'inherit', cwd: __dirname });
    } catch (err) {
        console.error('Build failed! Fix errors and try again.');
        process.exit(1);
    }
}

if (!fs.existsSync(standalonePath)) {
    console.error('Build completed but .next/standalone not found.');
    console.error('Make sure next.config.mjs has: output: "standalone"');
    process.exit(1);
}

console.log('[OK] Standalone build found');

// Step 2: Copy static assets into standalone
const staticSrc = path.join(__dirname, '.next', 'static');
const staticDest = path.join(standalonePath, '.next', 'static');

if (fs.existsSync(staticSrc)) {
    execSync(`cp -r "${staticSrc}" "${staticDest}"`, { stdio: 'inherit' });
    console.log('[OK] .next/static copied');
} else {
    console.error('.next/static not found!');
    process.exit(1);
}

// Step 3: Copy public folder into standalone
const publicSrc = path.join(__dirname, 'public');
const publicDest = path.join(standalonePath, 'public');

if (fs.existsSync(publicSrc)) {
    execSync(`cp -r "${publicSrc}" "${publicDest}"`, { stdio: 'inherit' });
    console.log('[OK] public/ folder copied');
}

// Step 4: Verify critical files exist
const criticalFiles = [
    { path: path.join(standalonePath, 'server.js'), name: 'server.js' },
    { path: path.join(standalonePath, 'package.json'), name: 'package.json' },
    { path: path.join(standalonePath, '.next'), name: '.next/' },
];

let allGood = true;
for (const file of criticalFiles) {
    if (fs.existsSync(file.path)) {
        console.log(`[OK] ${file.name} present`);
    } else {
        console.error(`[MISSING] ${file.name}`);
        allGood = false;
    }
}

if (!allGood) {
    console.error('\nSome critical files are missing. Check your build.');
    process.exit(1);
}

// Step 5: Check for public assets
const publicChecks = ['favicon.ico', 'favicon.svg', 'manifest.json', 'images'];
for (const item of publicChecks) {
    const itemPath = path.join(publicDest, item);
    if (fs.existsSync(itemPath)) {
        console.log(`[OK] public/${item} present`);
    } else {
        console.log(`[WARN] public/${item} not found`);
    }
}

// Step 6: Create zip
console.log('\nCreating hostinger-deploy.zip...');
const zipPath = path.join(__dirname, 'hostinger-deploy.zip');

// Remove old zip if exists
if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
}

try {
    execSync(`cd "${standalonePath}" && zip -r "${zipPath}" .`, { stdio: 'inherit' });
    const stats = fs.statSync(zipPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(1);
    console.log(`[OK] hostinger-deploy.zip created (${sizeMB} MB)`);
} catch (err) {
    console.error('Failed to create zip. Install zip: sudo apt install zip');
    console.log('\nYou can manually zip the .next/standalone/ folder instead.');
}

console.log('\n--- NEXT STEPS ---');
console.log('1. Log into Hostinger hPanel');
console.log('2. Go to File Manager > public_html');
console.log('3. Upload hostinger-deploy.zip');
console.log('4. Extract the zip');
console.log('5. Go to Node.js settings:');
console.log('   - Startup File: server.js');
console.log('   - Node.js Version: 20.x');
console.log('   - Add env: PORT=3000, NODE_ENV=production');
console.log('6. Click Start/Restart');
console.log('7. Check Security settings - make sure crawlers are not blocked');
console.log('\nSee HOSTINGER_DEPLOYMENT_GUIDE.md for full details.');

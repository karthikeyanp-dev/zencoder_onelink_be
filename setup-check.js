const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('OneLink Backend Setup Verification');
console.log('=================================\n');

// Check Node.js version
const nodeVersion = process.version;
console.log(`Node.js version: ${nodeVersion}`);
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0], 10);
if (majorVersion < 18) {
  console.warn('⚠️ Warning: Node.js version should be 18 or higher for optimal performance');
} else {
  console.log('✅ Node.js version is compatible');
}

// Check npm version
try {
  const npmVersion = execSync('npm --version').toString().trim();
  console.log(`npm version: ${npmVersion}`);
  const npmMajorVersion = parseInt(npmVersion.split('.')[0], 10);
  if (npmMajorVersion < 9) {
    console.warn('⚠️ Warning: npm version should be 9 or higher for optimal performance');
  } else {
    console.log('✅ npm version is compatible');
  }
} catch (error) {
  console.error('❌ Error checking npm version:', error.message);
}

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  console.log('✅ .env file exists');
} else {
  console.error('❌ .env file is missing. Please create one based on the README instructions.');
}

// Check if required directories exist
const requiredDirs = [
  'src/auth',
  'src/users',
  'src/collections',
  'src/links',
  'src/sharing',
  'src/metadata',
  'src/config',
  'src/database',
];

let allDirsExist = true;
for (const dir of requiredDirs) {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`✅ Directory ${dir} exists`);
  } else {
    console.error(`❌ Directory ${dir} is missing`);
    allDirsExist = false;
  }
}

// Check if Docker is installed
try {
  const dockerVersion = execSync('docker --version').toString().trim();
  console.log(`✅ Docker is installed: ${dockerVersion}`);
} catch (error) {
  console.warn('⚠️ Warning: Docker is not installed or not in PATH. Docker is required for local development with PostgreSQL.');
}

// Check if Docker Compose is installed
try {
  const dockerComposeVersion = execSync('docker-compose --version').toString().trim();
  console.log(`✅ Docker Compose is installed: ${dockerComposeVersion}`);
} catch (error) {
  console.warn('⚠️ Warning: Docker Compose is not installed or not in PATH. Docker Compose is required for local development with PostgreSQL.');
}

console.log('\nSetup verification complete!');
if (allDirsExist) {
  console.log('✅ All required directories exist. The project structure looks good.');
  console.log('\nNext steps:');
  console.log('1. Start the database: docker-compose up -d');
  console.log('2. Start the application: npm run start:dev');
  console.log('3. Seed the database (optional): npm run seed');
} else {
  console.error('❌ Some required directories are missing. Please check the project structure.');
}
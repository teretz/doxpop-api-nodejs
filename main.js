const express = require('express');
const app = express();
// Your existing code here
console.log('express loaded');
// Additional code for Watcher and ServerManager
const Logger = require('./logger');
const Watcher = require('./watcher');
const ServerManager = require('./serverManager');
const dotenv = require('dotenv');

dotenv.config();
console.log('dotenv loaded');
const logger = new Logger();
const watcher = new Watcher(logger);
const serverManager = new ServerManager(logger);

// Watch and sync directories
watcher.watchAndSync();
console.log('Watcher started');

// Restart server when a file changes
fs.watch(process.env.SOURCE_DIR, { recursive: true }, (eventType, filename) => {
  if (filename) {
    serverManager.restartServer();
  }
});
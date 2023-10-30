const fs = require('fs');
const { exec } = require('child_process');
const dotenv = require('dotenv');
const Logger = require('./logger');
const logger = new Logger();

dotenv.config();

const sourceDir = process.env.SOURCE_DIR;
const targetDir = process.env.TARGET_DIR;

class Watcher {
  constructor(logger) {
    this.logger = logger;
  }

  watchAndSync() {
    // Log: Starting directory watch
    this.logger.info('Starting directory watch');
    fs.watch(sourceDir, { recursive: true }, (eventType, filename) => {
      if (filename) {
        // Log: File changed
        this.logger.info(`File changed: ${filename}`);
        this.rsync();
      }
    });
  }

  rsync() {
    // Log: Starting rsync
    this.logger.info('Starting rsync');
    exec(`rsync -av --delete ${sourceDir} ${targetDir}`, (error, stdout, stderr) => {
      if (error) {
        // Log: Rsync error
        this.logger.error(`Rsync error: ${error}`);
        return;
      }
      // Log: Rsync stdout
      this.logger.info(`Rsync stdout: ${stdout}`);
      // Log: Rsync stderr
      this.logger.info(`Rsync stderr: ${stderr}`);
    });
  }
}

module.exports = Watcher;
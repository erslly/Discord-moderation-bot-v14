const fs = require('fs');
const path = require('path');

const logDir = 'logs';
const logFile = 'app.log';
const logPath = path.join(logDir, logFile);

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

class LogStorage {
  constructor() {
    this.logs = [];
  }

  addLog(log) {
    this.logs.push(log);
    fs.appendFileSync(logPath, `${new Date().toISOString()} - ${log}\n`);
  }

  getLogs() {
    return this.logs;
}

  clearLogs() {
    this.logs = [];
    fs.truncateSync(logPath, 0);
  }
}

module.exports = LogStorage;
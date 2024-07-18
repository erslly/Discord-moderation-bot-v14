// logFormatter.js

const logLevels = require('./loglevels');

function formatLogMessage(level, message) {
  const levelName = Object.keys(logLevels).find(
    (key) => logLevels[key] === level
  );

  return `${new Date().toISOString()} [${levelName}] - ${message}`;
}

module.exports = formatLogMessage;
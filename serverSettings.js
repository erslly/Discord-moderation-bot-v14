const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, '..', 'config.json');
const config = require('./config.json');

const serverSettingsPath = path.join(__dirname, '..', 'serverSettings.json');

if (!fs.existsSync(serverSettingsPath)) {
  fs.writeFileSync(serverSettingsPath, JSON.stringify({}, null, 2));
}

const serverSettings = require(serverSettingsPath);

module.exports = {
  getChannelID: (guildID) => {
    if (!serverSettings[guildID]) {
      return null;
    }

    return serverSettings[guildID].modLog?.channelID;
  },
  save: () => {
    fs.writeFileSync(serverSettingsPath, JSON.stringify(serverSettings, null, 2));
  },
};
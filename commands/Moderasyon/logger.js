const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../../config.json');
const modlog = require('./Modlog.js');
const serverSettings = require('../../serverSettings.js');

const logger = {
  log: (message) => {
    console.log(`[${new Date().toLocaleString()}] ${message}`);
  },

  error: (error) => {
    console.error(`[${new Date().toLocaleString()}] ${error}`);
  },

  modlog: async (guildID, type, user, reason) => {
    const channelID = serverSettings.getChannelID(guildID);

    if (!channelID) {
      logger.error(`Log kanalı ayarlanmamış: ${guildID}`);
      return;
    }

    const channel = await modlog.getChannel(channelID);

    if (!channel) {
      logger.error(`Log kanalı bulunamadı: ${channelID}`);
      return;
    }

    const embed = new Discord.MessageEmbed()
      .setColor(config.embedColor)
      .setTitle(`${type} Log`)
      .addField('Kullanıcı', user.tag, true)
      .addField('ID', user.id, true)
      .addField('Sebep', reason, false);

    channel.send({ embeds: [embed] });
  },
};

module.exports = logger;
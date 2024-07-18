const fs = require('fs');
const path = require('path');
const config = require('../../config.json');
const serverSettingsPath = path.resolve(__dirname, '../../serverSettings.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('modlog')
        .setDescription('Sunucu mod log kanalını ayarlayın veya sıfırlayın.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ayarla')
                .setDescription('Mod log kanalını ayarlar.')
                .addChannelOption(option =>
                    option
                        .setName('kanal')
                        .setDescription('Mod log kanalı')
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('sıfırla')
                .setDescription('Mod log kanalını sıfırlar.')),
    async execute(interaction) {
        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case 'ayarla':
                const channel = interaction.options.getChannel('kanal');
                await setModLogChannel(interaction, channel);
                break;
            case 'sıfırla':
                await resetModLogChannel(interaction);
                break;
            default:
                await interaction.reply('Geçersiz komut. Lütfen `ayarla` veya `sıfırla` komutlarını kullanın.');
                break;
        }
    },
};

async function setModLogChannel(interaction, channel) {
    const serverID = interaction.guild.id;
    const serverSettings = getServerSettings();
    serverSettings[serverID] = serverSettings[serverID] || {};
    serverSettings[serverID].modLog = { channelID: channel.id };

    writeServerSettings(serverSettings);

    await interaction.reply(`Mod log kanalı başarıyla ayarlandı: <#${channel.id}>`);
}

async function resetModLogChannel(interaction) {
    const serverID = interaction.guild.id;
    const serverSettings = getServerSettings();
    delete serverSettings[serverID].modLog;

    writeServerSettings(serverSettings);

    await interaction.reply('Mod log kanalı başarıyla sıfırlandı.');
}

function getServerSettings() {
    if (fs.existsSync(serverSettingsPath)) {
        const data = fs.readFileSync(serverSettingsPath);
        return JSON.parse(data);
    }
    return {};
}

function writeServerSettings(settings) {
    fs.writeFileSync(serverSettingsPath, JSON.stringify(settings, null, 2));
}
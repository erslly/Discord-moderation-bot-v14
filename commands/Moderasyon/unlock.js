const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Unlocks the channel.'),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({
                content: 'You do not have the Manage Channels permission!',
                ephemeral: true,
            });
        }

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({
                content: 'I do not have the Manage Channels permission!',
                ephemeral: true,
            });
        }

        const everyoneRole = interaction.guild.roles.cache.find(role => role.name.toLowerCase().trim() === "@everyone");

        const embedSuccess = new EmbedBuilder()
            .setColor('Green')
            .setDescription('<a:onay:1241128947065032895> | **Kanalın Kilidi Başarıyla Açıldı**\nArtık bu kanaldan mesaj gönderilebilir.');

        const embedError = new EmbedBuilder()
            .setColor('Red')
            .setDescription('<a:hayr:1241129018024001627> | **Kanalın kilidi açılırken bir hata oluştu**');

        try {
            await interaction.channel.permissionOverwrites.edit(everyoneRole, {
                SendMessages: null,
                AddReactions: null
            });
            await interaction.reply({ embeds: [embedSuccess], ephemeral: true });
        } catch (e) {
            console.error(e);
            await interaction.reply({ embeds: [embedError], ephemeral: true });
        }
    },
};
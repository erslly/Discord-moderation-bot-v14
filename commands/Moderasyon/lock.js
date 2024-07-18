const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Kanalı kilitler.'),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({
                content: 'Kanalları Yönet yetkiniz yok!',
                ephemeral: true,
            });
        }

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({
                content: 'Kanalları Yönet iznim yok!',
                ephemeral: true,
            });
        }

        const everyoneRole = interaction.guild.roles.cache.find(role => role.name.toLowerCase().trim() === "@everyone");

        const embedSuccess = new EmbedBuilder()
            .setColor('Green')
            .setDescription('<a:onay:1241128947065032895> | **Kanal Başarıyla Kilitlendi**\nBu kanalda artık mesaj gönderilemez.');

        const embedError = new EmbedBuilder()
            .setColor('Red')
            .setDescription('<a:hayr:1241129018024001627> | **Kanal Kilitlenirken Bir Hata Oluştu**');

        try {
            await interaction.channel.permissionOverwrites.edit(everyoneRole, {
                SendMessages: false,
                AddReactions: false
            });
            await interaction.reply({ embeds: [embedSuccess], ephemeral: true });
        } catch (e) {
            console.error(e);
            await interaction.reply({ embeds: [embedError], ephemeral: true });
        }
    },
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('slowomode')
        .setDescription('Belirtilen süre boyunca yazma yavaş modunu etkinleştirir.')
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Yavaş mod süresi (saniye cinsinden)')
                .setRequired(true)),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({
                content: 'Bu komutu kullanmak için Manage Channels iznine sahip olmanız gerekir!',
                ephemeral: true,
            });
        }

        const duration = interaction.options.getInteger('duration');

        const embedSuccess = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`<a:onay:1241128947065032895> | **Bu kanal için yazma yavaş modu ${duration} saniye boyunca etkinleştirildi.**`);

        const embedError = new EmbedBuilder()
            .setColor('Red')
            .setDescription('<a:hayr:1241129018024001627> | **Bir hata oluştu, yazma yavaş modu etkinleştirilemedi**');

        try {
            await interaction.channel.setRateLimitPerUser(duration);
            await interaction.reply({ embeds: [embedSuccess] });
        } catch (e) {
            console.error(e);
            await interaction.reply({ embeds: [embedError] });
        }
    },
};
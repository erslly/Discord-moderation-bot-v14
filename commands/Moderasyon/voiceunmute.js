const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unvoicemute')
        .setDescription('Belirtilen kullanıcıyı ses kanalından susturmasını kaldırır.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Susturulmuş kullanıcıyı seçin')
                .setRequired(true)),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: '<a:hayr:1241129018024001627> Bu komutu kullanmak için Moderate Members iznine sahip olmanız gerekir!',
                ephemeral: true,
            });
        }

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: '<a:hayr:1241129018024001627> Bu komutu kullanmak için Moderate Members iznine sahip olmanız gerekir!',
                ephemeral: true,
            });
        }

        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);

        const embedSuccess = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`<a:onay:1241128947065032895> | **${user.username} kullanıcısı ses kanalından susturulması kaldırıldı.**`);

        const embedError = new EmbedBuilder()
            .setColor('Red')
            .setDescription('<a:hayr:1241129018024001627> | **Bir hata oluştu, kullanıcının ses kanalından susturulması kaldırılamadı**');

        try {
            await member.voice.setMute(false);
            await interaction.reply({ embeds: [embedSuccess] });
        } catch (e) {
            console.error(e);
            await interaction.reply({ embeds: [embedError] });
        }
    },
};
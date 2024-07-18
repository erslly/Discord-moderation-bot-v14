const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voicemute')
        .setDescription('Belirtilen süre boyunca kullanıcıyı ses kanalında susturur.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Susturmak istediğiniz kullanıcı')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('Susturulma süresi (dakika cinsinden)')
                .setRequired(true)),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: 'Bu komutu kullanmak için Moderate Members iznine sahip olmanız gerekir!',
                ephemeral: true,
            });
        }

        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: 'Bu komutu kullanmak için Moderate Members iznine sahip olmanız gerekir!',
                ephemeral: true,
            });
        }

        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const duration = interaction.options.getInteger('duration');

        if (!member.voice.channel) {
            return interaction.reply({
                content: '<a:hayr:1241129018024001627> Belirtilen kullanıcı ses kanalına bağlı değil!',
                ephemeral: true,
            });
        }

        const embedSuccess = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`<a:onay:1241128947065032895> | **${user.username} kullanıcısı ${duration} dakika boyunca bu ses kanalında susturuldu.**`);

        const embedError = new EmbedBuilder()
            .setColor('Red')
            .setDescription('<a:hayr:1241129018024001627> | **Bir hata oluştu, kullanıcı susturulamadı**');

        try {
            await member.voice.setMute(true);
            setTimeout(() => {
                member.voice.setMute(false);
            }, duration * 60000);
            await interaction.reply({ embeds: [embedSuccess] });
        } catch (e) {
            console.error(e);
            await interaction.reply({ embeds: [embedError] });
        }
    },
};
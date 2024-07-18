const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Belirtilen süre boyunca kullanıcıyı metin kanalında susturur.')
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

        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id);
        const duration = interaction.options.getInteger('duration');

        if (member.permissions.has(PermissionFlagsBits.ModerateMembers) && member.id !== interaction.user.id) {
            return interaction.reply({
                content: 'Bu kullanıcı sizden daha yetkili, onu susturamazsınız!',
                ephemeral: true,
            });
        }

        const embedSuccess = new EmbedBuilder()
            .setColor('Green')
            .setDescription(`<a:onay:1241128947065032895> | **${user.username} kullanıcısı ${duration} dakika boyunca metin kanalında susturuldu.**`);

        const embedError = new EmbedBuilder()
            .setColor('Red')
            .setDescription('<a:hayr:1241129018024001627> | **Bir hata oluştu, kullanıcı susturulamadı**');

        try {
            await member.timeout(duration * 60000);
            await interaction.reply({ embeds: [embedSuccess] });
            setTimeout(() => {
                member.timeout(null);
            }, duration * 60000);
        } catch (e) {
            console.error(e);
            await interaction.reply({ embeds: [embedError] });
        }
    },
};
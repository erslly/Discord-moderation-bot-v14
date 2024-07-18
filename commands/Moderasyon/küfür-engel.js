const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const db = require('croxydb');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('küfür-engel')
        .setDescription('Küfür Engel Sistemini Açıp Kapatırsınız!'),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return interaction.reply({
                content: 'Rolleri Yönet yetkiniz yok!',
                ephemeral: true,
            });
        }

        const embedOn = new EmbedBuilder()
            .setColor('Red')
            .setDescription('<a:onay:1241128947065032895> | **Sistem Açıldı**\nKüfür algılandığında mesaj silinecek ve kullanıcı uyarılacak.');

        const embedOff = new EmbedBuilder()
            .setColor('Green')
            .setDescription('<a:onay:1241128947065032895> | **Sistem Kapatıldı**\nKüfür algılandığında mesaj silinmeyecek.');

        const küfürEngel = db.get(`kufurengel_${interaction.guild.id}`);

        if (küfürEngel) {
            db.delete(`kufurengel_${interaction.guild.id}`);
            await interaction.reply({ embeds: [embedOff], ephemeral: true });
        } else {
            db.set(`kufurengel_${interaction.guild.id}`, true);
            await interaction.reply({ embeds: [embedOn], ephemeral: true });
        }
    },
};

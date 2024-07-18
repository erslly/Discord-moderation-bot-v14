const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yasaklılar')
        .setDescription('Sunucudaki yasaklı kullanıcıları gösterir.'),
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return interaction.reply({
                content: '<a:hayr:1241129018024001627> Bu komutu kullanmak için Ban Members iznine sahip olmanız gerekir!',
                ephemeral: true,
            });
        }

        const bannedUsers = await interaction.guild.bans.fetch();
        const moderatorBans = bannedUsers.filter(ban => ban.moderator && ban.moderator.id === interaction.user.id);

        const embed = new EmbedBuilder()
            .setColor('Blue')
            .setTitle('Sunucudaki Yasaklı Kullanıcılar')
            .setDescription(`Sunucudaki yasaklı kullanıcılar aşağıda listelenmiştir.`);

;

        moderatorBans.forEach(ban => {
            embed.addFields({ name: `Yasakladığınız kullanıcı: ${ban.user.tag}`, value: `ID: ${ban.user.id}`, inline: false });
        });

        bannedUsers.forEach(ban => {
            if (!moderatorBans.has(ban)) {
                embed.addFields({ name: ban.user.tag, value: `ID: ${ban.user.id}\nYasaklanma nedeni: ${ban.reason}`, inline: false });
            }
        });

        await interaction.reply({ embeds: [embed] });
    },
};
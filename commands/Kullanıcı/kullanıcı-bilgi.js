const { Client, SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kullanıcı-bilgi')
        .setDescription('Etiketlenen kullanıcının genel bilgilerini gösterir.')
        .addUserOption(option =>
            option
                .setName('kullanıcı')
                .setDescription('Bir kullanıcı etiketleyin.')
                .setRequired(true)
        ),
    run: async (client, interaction) => {

        const member = interaction.options.getMember('kullanıcı')

        const embed = new EmbedBuilder()
            .setDescription(`**➥ Kullanıcı Bilgileri**
            
    • Kullanıcı: (<@${member.user.id}> - \`${member.user.id}\`)
    • Hesap Kurulum Tarihi: <t:${parseInt(member.user.createdTimestamp / 1000)}:R>
    • Sunucuya Katılma Tarihi: <t:${parseInt(member.joinedTimestamp / 1000)}:R>
    `)
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setColor("Random")
        interaction.reply({ embeds: [embed] })

    },

};

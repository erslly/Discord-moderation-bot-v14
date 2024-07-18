const { Client, SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");
    module.exports = {
        data: new SlashCommandBuilder()
  .setName('ban')
        .setDescription('Etiketlenen kullanıcıyı sunucudan banlar.')
        .addUserOption(option =>
            option
                .setName('kullanıcı')
                .setDescription('Bir kullanıcı etiketleyin.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('sebep')
                .setDescription('Kullanıcı hangi sebep ile banlanıyor?')
        ),
    run: async (client, interaction) => {
        const yetkinYokEmbed = new EmbedBuilder()
            .setDescription(`<a:hayr:1241129018024001627> | Üyeleri Yasakla Yetkin Yok!`)
            .setColor("Red")
        const ayniYetkiEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`<a:hayr:1241129018024001627> | Bu Kullanıcının Ban Yetkisi Olduğu İçin Onu Yasaklayamadım.`)
        const banladimEmbed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(`<a:onay:1241128947065032895> | Başarıyla Üyeyi Yasakladım!`)
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ embeds: [yetkinYokEmbed], ephemeral: true })
        const user = interaction.options.getMember('kullanıcı')
        const sebep = interaction.options.getString('sebep')
        try {
            if (user.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ embeds: [ayniYetkiEmbed], ephemeral: true })
            await user.ban({ reason: sebep });
            interaction.reply({ embeds: [banladimEmbed] })
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setColor("Red")
                .setDescription('<a:hayr:1241129018024001627> | Botun yetkisi yetersiz.')

            interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        },
};

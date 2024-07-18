const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const db = require("croxydb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Etiketlenen kullanıcıyı sunucudan atar.')
        .addStringOption(option =>
            option
                .setName('sebep')
                .setDescription('Bir sebep belirt.')
                .setRequired(true)
        ),
    run: async (client, interaction) => {

        const embed = new EmbedBuilder()
            .setDescription(`<a:onay:1241128947065032895> | Başarıyla Afk Oldun!`)

        const sebep = interaction.options.getString('sebep')
        db.set(`afk_${interaction.user.id}`, sebep);
        db.set(`afkDate_${interaction.user.id}`, { date: Date.now() })
        interaction.reply({embeds: [embed]})

    },};

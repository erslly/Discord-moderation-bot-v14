const { PermissionsBitField, EmbedBuilder, SlashCommandBuilder, IntegrationApplication } = require("discord.js");
const db = require("croxydb")
const {
    inspect
} = require("util");
const config = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Sadece bot sahibi kullanabilir.')
        .addStringOption(option =>
            option
                .setName('code')
                .setDescription('Code')
                .setRequired(true)
        ),
    run: async (client, interaction) => {
        const nembed = new EmbedBuilder()
            .setTitle("EVAL").setColor("Random")
            .setDescription("<a:hayr:1241129018024001627> Bu komutu sadece sahibim kullanabilir.")

        if (interaction.user.id !== config.ownerID) {
            return interaction.reply({
                embeds: [nembed],
                ephemeral: true,
            });
        }

        let toEval = interaction.options.getString("code")


        try {
            const embed = new EmbedBuilder()
                .setTitle("EVAL").setColor("Random")
                .setDescription("<a:hayr:1241129018024001627> Error: `Cannot evaluate nothing`")
            let evaluated = inspect(eval(toEval, {
                depth: 0
            }))
            if (!toEval) return interaction.followUp({
                embeds: [embed]
            });
            const embed1 = new EmbedBuilder()
                .setTitle("EVAL").setColor("Random")
                .setDescription("<a:hayr:1241129018024001627> Error: `Request is too long.`")

            if (evaluated.length > 1950) return interaction.followUp({
                embeds: [embed1]
            });
            let hrDiff = process.hrtime(process.hrtime());
            const embed2 = new EmbedBuilder()
                .setTitle("EVAL").setColor("Random")
                .setDescription(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``)
            interaction.reply({
                embeds: [embed2]
            })
        } catch (e) {
            interaction.reply({
                content: `An error occurred : \`${e.message}\``
            });
        }

    }
}
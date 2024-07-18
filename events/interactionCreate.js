const { Events, InteractionType, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, ReactionUserManager } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: Events.InteractionCreate,
    execute: async (interaction) => {


        let client = interaction.client;

        const bakimmodu = new EmbedBuilder()
            .setTitle(`Botumuz şuan da bakimdadir.`)
            .setDescription(`Herhangi bir sorunuz vs. varsa <@815668704435896321>'e ulaşınız!`);

        if (db.fetch(`bakim`)) {
            if (interaction.user.id !== "815668704435896321") { return interaction.reply({ embeds: [bakimmodu]}) }
        }

        if (interaction.type == InteractionType.ApplicationCommand) {
            if (interaction.user.bot) return;
            try {
                const command = client.slashcommands.get(interaction.commandName)
                command.run(client, interaction)
            } catch (e) {
                const embed = new EmbedBuilder()
                    .setDescription(`Komut çalıştırılamadı lütfen tekrar deneyin !`)
                interaction.reply({ embeds: [embed], ephemeral: true })
            }
        }
    }
}
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const db = require("croxydb");
const config = require("../../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bakim")
        .setDescription("Etiketlenen kullanıcıyı sunucudan banlar.")
        .addBooleanOption(option =>
            option
                .setName("status")
                .setDescription("Bakımı aç veya kapat.")
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

        const status = interaction.options.getBoolean("status");
        if (status === null) {
            const usageEmbed = new EmbedBuilder()
                .setColor("Random")
                .setTitle("Hatalı Kullanım")
                .setDescription("Bakım modunu açmak veya kapatmak için /bakim [true/false]")
                .setTimestamp();
            return interaction.reply({ embeds: [usageEmbed], ephemeral: true });
        }

        if (status) {
            if (db.fetch("bakim")) {
                const alreadyOpenEmbed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Bakım Zaten Açık")
                    .setDescription("Bakım zaten açık.")
                    .setTimestamp();
                return interaction.reply({ embeds: [alreadyOpenEmbed], ephemeral: true });
            }
            client.user.setActivity("Bakim modu aktif!");
            db.set("bakim", true);

            const successOpenEmbed = new EmbedBuilder()
                .setColor("Random")
                .setTitle("Bakım Modu Açıldı")
                .setDescription("Bakım modu başarıyla açıldı.")
                .setTimestamp();
            await interaction.reply({ embeds: [successOpenEmbed] });
        } else {
            if (!db.fetch("bakim")) {
                const alreadyClosedEmbed = new EmbedBuilder()
                    .setColor("Random")
                    .setTitle("Bakım Zaten Kapalı")
                    .setDescription("Bakım zaten kapalı.")
                    .setTimestamp();
                return interaction.reply({ embeds: [alreadyClosedEmbed], ephemeral: true });
            }
            db.delete("bakim");

            const successCloseEmbed = new EmbedBuilder()
                .setColor("Random")
                .setTitle("Bakım Modu Kapatıldı")
                .setDescription("Bakım modu başarıyla kapatıldı.")
                .setTimestamp();
            await interaction.reply({ embeds: [successCloseEmbed] });
        }
    },
};

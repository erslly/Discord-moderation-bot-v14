const { Client, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const db = require("croxydb")
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reklam-engel")
        .setDescription("Reklam engel sistemini ayarlarsın."),

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({ content: "Rolleri Yönet Yetkin Yok!", ephemeral: true })
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<a:onay:1241128947065032895> **Sistem Kapatıldı** \n Reklam algılandığında mesaj silinmeyecek.")
        const embed2 = new EmbedBuilder()
            .setColor("Red")
            .setDescription("<a:onay:1241128947065032895> **Sistem Açıldı** \n Reklam algılandığında mesaj silinecek ve kullanıcı uyarılacak.")

        let reklam = db.fetch(`reklamengel_${interaction.guild.id}`);

        if (reklam) {

            db.delete(`reklamengel_${interaction.guild.id}`);
            interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })

            return
        }

        if (!reklam) {

            db.set(`reklamengel_${interaction.guild.id}`, true);
            interaction.reply({ embeds: [embed2], allowedMentions: { repliedUser: false } })

            return
        }



    }

};
const { PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const db = require("croxydb")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("oto-rol")
        .setDescription("🌟 Yeni gelenlere otomatik rol verir..")
        .addRoleOption((option) =>
            option
                .setName("rol")
                .setDescription("Lütfen bir rol etiketle..")
                .setRequired(true)

        ),

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) return interaction.reply({ content: "<a:hayr:1241129018024001627> Rolleri Yönet Yetkin Yok!", ephemeral: true })
        const rol = interaction.options.getRole('rol')
        db.set(`otorol_${interaction.guild.id}`, rol.id)
        interaction.reply({ content: "<a:onay:1241128947065032895> Otorol Başarıyla <@&" + rol + "> Olarak Ayarlandı." })
    }

};
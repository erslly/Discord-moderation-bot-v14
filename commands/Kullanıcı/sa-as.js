const { Client, Permissions, MessageEmbed } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "sa-as",
  description: "Selam Sistemini Açıp Kapatırsın!",
  type: 1,
  options: [],

  run: async (client, interaction) => {
    // interaction.member ve interaction.guild kontrolü
    if (!interaction.member || !interaction.guild) return;

    // Kullanıcının yetkilerini kontrol et
    if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) return interaction.reply({ content: "Rolleri Yönet Yetkin Yok!", ephemeral: true });

    const embed = new MessageEmbed()
      .setColor("pink")
      .setDescription("<a:onay:1241128947065032895> Sistem Kapatıldı Bot Selam Almayacak");

    const embed2 = new MessageEmbed()
      .setColor("pink")
      .setDescription("<a:onay:1241128947065032895> Sistem Açıldı**\nArtık Bot Selamı Alıcak.");

    let slm = db.fetch(`saas_${interaction.guild.id}`);

    if (slm) {
      db.delete(`saas_${interaction.guild.id}`);
      interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      return;
    }

    if (!slm) {
      db.set(`saas_${interaction.guild.id}`, true);
      interaction.reply({ embeds: [embed2], allowedMentions: { repliedUser: false } });
      return;
    }
  }
};

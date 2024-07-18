const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sesat')
    .setDescription('Bir kullanıcıyı ses kanalından atar.')
    .addUserOption(option =>
      option.setName('kullanıcı')
        .setDescription('Kişiyi atacak olan kullanıcı')
        .setRequired(true)),
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      return interaction.reply({
        content: '<a:hayr:1241129018024001627> Kick Members iznine sahip değilsin!',
        ephemeral: true,
      });
    }

    const kullanıcı = interaction.options.getUser('kullanıcı');
    const üye = interaction.guild.members.cache.get(kullanıcı.id);

    if (!üye.voice.channel) {
      return interaction.reply({
        content: '<a:hayr:1241129018024001627> Kullanıcı ses kanalında değil!',
        ephemeral: true,
      });
    }

    const embedSuccess = new EmbedBuilder()
      .setColor('Green')
      .setDescription(`<a:onay:1241128947065032895> | **${kullanıcı.username} ses kanalından atıldı.**`);

    const embedError = new EmbedBuilder()
      .setColor('Red')
      .setDescription('<a:hayr:1241129018024001627> | **Kullanıcı atılırken bir hata oluştu**');

    try {
      await üye.voice.disconnect();
      await interaction.reply({ embeds: [embedSuccess] });
    } catch (e) {
      console.error(e);
      await interaction.reply({ embeds: [embedError] });
    }
  },
};
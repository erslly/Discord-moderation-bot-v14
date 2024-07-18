const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sil')
        .setDescription('Sohbette istediğin kadar mesajı silersin!')
        .addIntegerOption(option =>
            option
                .setName('sayı')
                .setDescription('Temizlenecek Mesaj Sayısını Girin.')
                .setRequired(true)
                .setMaxValue(100)
                .setMinValue(1)
        ),
    run: async (client, interaction) => {
        // Check if the user has the required permissions to manage messages
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const noPermissionEmbed = new EmbedBuilder()
                .setDescription('<a:hayr:1241129018024001627> | Mesajları Yönetme Yetkin Yok!')
            .setColor("Red")
            return interaction.reply({ embeds: [noPermissionEmbed], ephemeral: true });
        }

        const count = interaction.options.getInteger('sayı');

        try {
            // Fetch the messages from the channel and delete them
            const fetchedMessages = await interaction.channel.messages.fetch({ limit: count });
            await interaction.channel.bulkDelete(fetchedMessages, true);

            const successEmbed = new EmbedBuilder()
                .setTitle('Başarılı')
                .setColor("Green")
                .setDescription(`<a:onay:1241128947065032895> | ${count} adet mesaj başarıyla silindi.`)
            interaction.reply({ embeds: [successEmbed], ephemeral: true });
        } catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setColor("Red")
                .setDescription('<a:hayr:1241129018024001627> | Botun yetkisi yetersiz.')

            interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    },
};

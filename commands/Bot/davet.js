const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('davet')
        .setDescription('Botun davet linkini gönderir'),
    async execute(interaction) {
        const inviteButton = new ButtonBuilder()
            .setLabel('Botu Davet Et')
            .setStyle('LINK')
            .setURL('https://discord.com/oauth2/authorize?client_id=1241121690600345620&permissions=8&scope=bot');  // Geçerli bir URL ekleyin

        const row = new ActionRowBuilder().addComponents(inviteButton);

        await interaction.reply({
            content: 'Botu davet etmek için aşağıdaki butonu kullanabilirsiniz.',
            components: [row]
        });
    },
};

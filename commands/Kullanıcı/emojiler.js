const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emojiler')
        .setDescription('Sunucuda bulunan emojileri listeler.'),

    run: async (client, interaction) => {


        let animEmotes = [], staticEmotes = [];
        interaction.guild.emojis.cache.forEach((x) => {
            x.animated ? animEmotes.push(`<a:${x.name}:${x.id}>`) : staticEmotes.push(`<:${x.name}:${x.id}>`);
        })
        const embed = new EmbedBuilder()
            .setTimestamp()
            .setColor('#ff0000')
            .setTitle(`Sunucuda Bulunan Emojiler!`)
            .setDescription(`${animEmotes} ${staticEmotes}`)
        interaction.reply({ embeds: [embed] })
    },
};

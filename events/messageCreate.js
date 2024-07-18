const { Events, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, ReactionUserManager } = require("discord.js");
const db = require("croxydb");
const fs = require("fs");

module.exports = {
    name: Events.MessageCreate,
    execute: async (message) => {

        if (await db.get(`afk_${message.author.id}`)) {

            const afkDate = db.fetch(`afkDate_${message.author.id}`)
            const sebep = db.fetch(`afk_${message.author.id}`)

            if (afkDate && sebep) {
                const date = new EmbedBuilder()
                    .setDescription(`${message.author} Hoş geldin! **${sebep}** sebebiyle <t:${parseInt(afkDate.date / 1000)}:R> afk'ydın`)
                db.delete(`afk_${message.author.id}`);
                db.delete(`afkDate_${message.author.id}`)

                return message.reply({ embeds: [date] })
            }

        }
        var kullanıcı = message.mentions.users.first();
        if (kullanıcı) {
            const afkDate = db.fetch(`afkDate_${kullanıcı.id}`)

            const sebep = await db.get(`afk_${kullanıcı.id}`);

            if (sebep) {
                const sebeps = new EmbedBuilder()
                    .setDescription(`:question: | Etiketlediğin kullanıcı **${sebep}** sebebiyle afk modunda!`)
                message.reply({ embeds: [sebeps] });
            }
        }
    }
}
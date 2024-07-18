const { EmbedBuilder, Colors, version, ActionRowBuilder, ButtonBuilder, ButtonStyle, Guild } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("istatistik")
        .setDescription("Botun istatistik bilgilerini gösterir."),

    run: async (client, interaction) => {
        try {
            let ben = interaction.client.user,
                toplamram = os.totalmem(),
                boştaolanram = os.freemem(),
                kullanılanram = toplamram - boştaolanram,
                yüzde = (kullanılanram / toplamram * 100).toFixed(2);

            let shardData = { sunucu: 0, kanal: 0, kullanıcı: 0, rol: 0, ramkullanımı: 0 };

            if (interaction.client.shard && interaction.client.shard.count > 0) {
                const shard = await interaction.client.shard.broadcastEval((client) => ({
                    sunucu: client.guilds.cache.size,
                    kanal: client.channels.cache.size,
                    kullanıcı: client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
                    rol: client.guilds.cache.reduce((acc, guild) => acc + guild.roles.cache.size, 0),
                    ramkullanımı: process.memoryUsage().heapUsed
                }));
                
                shardData = {
                    sunucu: shard.reduce((acc, shards) => acc + shards.sunucu, 0),
                    kanal: shard.reduce((acc, shards) => acc + shards.kanal, 0),
                    kullanıcı: shard.reduce((acc, shards) => acc + shards.kullanıcı, 0),
                    rol: shard.reduce((acc, shards) => acc + shards.rol, 0),
                    ramkullanımı: shard.reduce((acc, shards) => acc + shards.ramkullanımı, 0)
                };
            } else {
                // Shard kullanılmıyorsa, direkt client verilerini kullanın
                shardData = {
                    sunucu: client.guilds.cache.size,
                    kanal: client.channels.cache.size,
                    kullanıcı: client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0),
                    rol: client.guilds.cache.reduce((acc, guild) => acc + guild.roles.cache.size, 0),
                    ramkullanımı: process.memoryUsage().heapUsed
                };
            }

            const Uptime = moment
                .duration(client.uptime)
                .format(" D [gün], H [saat], m [dakika], s [saniye]");

            const embed = new EmbedBuilder()
                .setTitle("Aniki - İstatistik!")
                .setDescription(`
\`\`•\`\` **|** Sunucu Sayısı: ** ${shardData.sunucu.toLocaleString().replace(/\./g, ",")}**
\`\`•\`\` **|** Kullanıcı Sayısı: **${shardData.kullanıcı.toLocaleString().replace(/\./g, ",")}**
\`\`•\`\` **|** Kanal Sayısı: **${shardData.kanal.toLocaleString().replace(/\./g, ",")}**
\`\`•\`\` **|** Ping: **${client.ws.ping}**
\`\`•\`\` **|** Çalışma Süresi: **${Uptime}**
\`\`•\`\` **|** Bellek Kullanımı: **${(shardData.ramkullanımı / 1024 / 1024).toFixed(2)}Mb**
\`\`•\`\` **|** Cpu: **${os.cpus().map(i => `${i.model}`)[0]}**
\`\`•\`\` **|** Discord.JS: **${version}**
\`\`•\`\` **|** Geliştirici: <@815668704435896321>,<@715945443812573255>
`)
                .setImage("https://share.creavite.co/6647bfe1aac1146a40c3c281.gif")
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Bir hata oluştu:', error);
            await interaction.reply('İstatistikleri alırken bir hata oluştu.');
        }
    }
};

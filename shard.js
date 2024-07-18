const { ShardingManager, WebhookClient, EmbedBuilder } = require('discord.js');
const chalk = require('chalk');
const { token, shard: totalShards, webhook: url } = require("./config.json");

const manager = new ShardingManager('bot.js', { token, respawn: true, totalShards });
let wb;

if (url) {
    try {
        wb = new WebhookClient({ url });
    } catch (e) {
        console.error('Webhook oluşturulamadı:', e);
    }
}

manager.on('shardCreate', shard => {
    const shardLog = (message, color) => {
        if (wb) {
            wb.send({ embeds: [new EmbedBuilder().setDescription(message).setColor(color)] });
        }
        console.log(chalk.green(`[SHARD SYSTEM] `) + chalk[color](message));
    };

    shardLog(`#${shard.id} ID'li shard başarıyla başlatıldı`, 'red');
    
    shard.on("disconnect", () => shardLog(`#${shard.id} ID'li shardın bağlantısı koptu, yeniden başlatılmayı deniyor`, 'red'));
    shard.on("reconnecting", () => shardLog(`#${shard.id} ID'li shard yeniden başlatılıyor`, 'green'));
    shard.on("ready", () => shardLog(`#${shard.id} ID'li shard başarıyla başlatıldı`, 'yellow'));
    shard.on("death", () => shardLog(`#${shard.id} ID'li shardın bağlantısı koptu, yeniden başlatılmayı deniyor`, 'red'));
    shard.on("error", (err) => shardLog(`#${shard.id} ID'li shard'a bir hata oluştu\n\n• ${err}`, 'red'));
});

manager.spawn().then(() => {
    const message = `Bütün shard'lar başarıyla başlatıldı ve kullanıma hazır`;
    if (wb) {
        wb.send({ embeds: [new EmbedBuilder().setDescription(message).setColor("DarkPurple")] });
    }
    console.log(chalk.green(`[SHARD SYSTEM] `) + chalk.red(message));
});

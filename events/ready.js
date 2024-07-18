const { ActivityType, Events } = require("discord.js");
const Config = require("../config.json");
require('advanced-logs');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.success('', '[CLIENT] Successfully connected to Discord API.');

        let shardNumber = 1; // Başlangıçta 1. shard

        // Aktiviteyi güncelleyen bir fonksiyon
        const updateActivity = async () => {
            // Aktiviteyi güncelle
            try {
                await client.user.setActivity({
                    name: `@Aniki | Shard ${shardNumber}`,
                    type: ActivityType.Custom,
                });
            } catch (error) {
                console.error("Aktivite güncelleme hatası:", error);
            }

            // Shard numarasını artır, 4'ten fazlaysa 1'e dön
            shardNumber = shardNumber < 4 ? shardNumber + 1 : 1;
        };

        // İlk olarak "Shard 1" olarak ayarlanmış olan aktiviteyi ayarla
        updateActivity();

        // Aktiviteyi her 2 saatte bir güncelle
        setInterval(updateActivity, 2 * 60 * 60 * 1000); // 2 saat = 2 * 60 * 60 * 1000 milisaniye
    }
};

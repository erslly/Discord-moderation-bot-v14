const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("yardım")
        .setDescription("Botun yardım menüsünü gösterir."),

    run: async (client, interaction) => {
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('help_menu')
                    .setPlaceholder('Hiçbir şey seçilmedi')
                    .addOptions(
                        {
                            label: 'Ana Menü',
                            description: 'Ana menüye geri dönersin.',
                            emoji: "<:ana:1241130986708799518>",
                            value: 'home_option',
                        },
                        {
                            label: 'Bot Menüsü',
                            description: 'Bot ile ilgili yardım menüsünü gösterir.',
                            emoji: "<:bot:1241129766665322596>",
                            value: 'bot_option',
                        },
                        {
                            label: 'Moderasyon Menüsü',
                            description: 'Koruma ile ilgili yardım menüsünü gösterir.',
                            emoji: "<:mod:1241129732070703265>",
                            value: 'moderation_option',
                        },
                        {
                            label: 'Kullanıcı Menüsü',
                            description: 'Kullanıcı ile ilgili yardım menüsünü gösterir.',
                            emoji: "<:user:1241129869795131523>",
                            value: 'user_option',
                        },
                    ),
            );

        client.on("interactionCreate", async (interaction2) => {
            if (!interaction2.isStringSelectMenu()) return;
            if (interaction2.customId !== 'help_menu') return;
            if (interaction2.user.id !== interaction.user.id) return;

            const value = interaction2.values[0];

            const embed = new EmbedBuilder().setColor("#5865F2").setTimestamp().setFooter({ text: `${interaction2.user.tag} tarafından istendi.`, iconURL: interaction2.user.displayAvatarURL({ dynamic: true }) });

            switch (value) {
                case 'home_option':
                    embed.setTitle(`${client.user.username} - Yardım Menüsü!`)
                        .setThumbnail(interaction2.user.displayAvatarURL({ dynamic: true }))
                        .addFields(
                            { name: '/yardım', value: 'Yardım Menüsünü Gösterir.', inline: true },
                            { name: '/davet', value: 'Botun Davet Linklerini Gösterir.', inline: true },
                            { name: '/istatistik', value: 'Botun İstatistiklerini Gösterir.', inline: true },
                        );
                    break;

                case 'bot_option':
                    embed.setTitle(`${client.user.username} - Bot Yardım Menüsü!`)
                        .setThumbnail(interaction2.user.displayAvatarURL({ dynamic: true }))
                        .addFields(
                            { name: '/davet', value: 'Botun davet linkini gösterir.', inline: true },
                            { name: '/istatistik', value: 'Botun istatistiklerini gösterir.', inline: true },
                            { name: '/ping', value: 'Botun gecikmesini gösterir.', inline: true },
                            { name: '/shard', value: 'Botun shard bilgilerini gösterir.', inline: true },
                        );
                    break;

                case 'moderation_option':
                    embed.setTitle(`${client.user.username} - Moderasyon Yardım Menüsü!`)
                        .setThumbnail(interaction2.user.displayAvatarURL({ dynamic: true }))
                        .addFields(
                            { name: '/ban', value: 'Belirtilen kullanıcıyı sunucudan banlarsın.', inline: true },
                            { name: '/unban', value: 'Belirtilen idli kullanıcının banı varsa banını kaldırır.', inline: true },
                            { name: '/nuke', value: 'Kanalı silip yeniden oluşturur.', inline: true },
                            { name: '/küfür-engel', value: 'Sunucuda küfür engel sistemini açar.', inline: true },
                            { name: '/reklam-engel', value: 'Sunucuda reklam engel sistemini açar.', inline: true },
                            { name: '/kick', value: 'Belirtilen kullanıcıyı sunucudan atarsın.', inline: true },
                            { name: '/rol ver', value: 'Belirtilen kişiye belirtilen rolü verir.', inline: true },
                            { name: '/rol al', value: 'Belirtilen kişiden belirtilen rolü alır.', inline: true },
                            { name: '/sil', value: 'Belirttiğiniz kadar mesaj siler.', inline: true },
                            { name: '/yasaklılar', value: 'Sunucudan Yasaklanan Kullanıcıların Listesini Gösterir', inline: true},
                            { name: '/mute', value: 'Etiketlediğiniz Kullanıcıyı Belirttiğiniz Süre Kadar Muteler.', inline: true},
                            { name: '/unmute', value: 'Etiketldiğiniz Kullanıcının Mutesini Açar.', inline: true},
                            { name: '/slowmode', value: 'İstediğiniz Kanalda Yavaş Mod Açar', inline: true},
                            { name: '/voicemute', value: 'Etiketlediğiniz Kullanıcının Sesini Kapatır', inline: true},
                            { name: '/voiceunmute', value: 'Etiketlediğiniz Kullanıcının Sesini Açar', inline: true},
                            { name: '/voicekick', value: 'Etiketlediğiniz Kullanıcıyı Sesten Kickler', inline: true},
                            { name: '/lock', value: 'İstediğiniz Kanalı Kilitler', inline: true },
                            { name: '/unlock', value: 'Kilitlediğiniz Kanalı Geri Açar', inline: true},


                        );
                    break;

                case 'user_option':
                    embed.setTitle(`${client.user.username} - Kullanıcı Yardım Menüsü!`)
                        .setThumbnail(interaction2.user.displayAvatarURL({ dynamic: true }))
                        .addFields(
                            { name: '/afk', value: 'AFK Olursun.', inline: true },
                            { name: '/sunucu-bilgi', value: 'Sunucunun bilgilerini gösterir.', inline: true },
                            { name: '/kullanıcı-bilgi', value: 'Belirtilen kullanıcının bilgilerini gösterir.', inline: true },
                            { name: '/yardım', value: 'Botun yardım menüsünü gösterir.', inline: true },
                            { name: '/avatar', value: 'Kendinizin veya bir başkasının profil fotoğrafını görüntülersiniz.', inline: true },
                            { name: '/emojiler', value: 'Sunucuda bulunan emojileri listeler.', inline: true },
                            { name: '/çeviri', value: 'Çeviri yaparsın.', inline: true },
                            { name: '/random-anime', value: 'Random Anime Fotoğrafı Atar.', inline: true},
                        );
                    break;

                default:
                    return;
            }

            interaction2.update({ embeds: [embed], components: [row] });
        });

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle(`${client.user.username} - Yardım Menüsü!`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: '/yardım', value: 'Yardım Menüsünü Gösterir.', inline: true },
                { name: '/davet', value: 'Botun Davet Linklerini Gösterir.', inline: true },
                { name: '/istatistik', value: 'Botun İstatistiklerini Gösterir.', inline: true },
            )
            .setFooter({ text: `${interaction.user.tag} tarafından istendi.`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        await interaction.reply({ embeds: [embed], components: [row] });

        const suredoldu = new EmbedBuilder().setDescription('Süreniz Doldu!');

        const editMessageAfterTimeout = () => {
            interaction.editReply({
                embeds: [suredoldu],
                components: []
            }).catch(() => { });
        };

        setTimeout(editMessageAfterTimeout, 300000);
    },
};

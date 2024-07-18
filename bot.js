const { Client, GatewayIntentBits, PermissionFlagsBits, Collection, EmbedBuilder } = require("discord.js");
const fs = require('node:fs');
const path = require('node:path');
const config = require('./config.json');
const chalk = require('chalk');
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { readdirSync } = require("fs");
const moment = require("moment");
const db = require("croxydb");
const formatLogMessage = require('./logFormatter');
const logLevels = require("./loglevels");

const client = new Client({ intents: Object.values(GatewayIntentBits) });

const logLevel = logLevels.INFO;
const message = 'This is an info message';
const formattedMessage = formatLogMessage(logLevel, message);
console.log(formattedMessage);

let token = config.token;

client.commands = new Collection();
client.slashcommands = new Collection();
client.commandaliases = new Collection();

const rest = new REST({ version: "10" }).setToken(token);

const slashcommands = [];
const commandFolders = readdirSync('./commands');

console.log(chalk.red('[COMMANDS] Loading Commands...'));

for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const commandPath = `./commands/${folder}/${file}`;
        const command = require(commandPath);
        const commandCategory = folder.toUpperCase();
        if (command.data) {
            slashcommands.push(command.data.toJSON());
            client.slashcommands.set(command.data.name, command);
            console.log(chalk.cyan(`[COMMANDS] ${command.data.name} Yüklendi ${chalk.yellow('-')} ${chalk.red('Kategori: ' + commandCategory)}`));
        }
    }
}

client.on("ready", async () => {
    try {
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: slashcommands,
        });
        console.log(chalk.red(`[START]`) + chalk.green(` ${client.user.username} Aktif Edildi!`));
    } catch (error) {
        console.error(error);
    }

    const channel = client.channels.cache.get("LOG KANAL ID");
    const embed = new EmbedBuilder()
        .setTitle("Bot Aktif")
        .setColor("Green")
        .setDescription(`${client.user.username} aktif oldu!`)
        .setTimestamp();

    channel.send({ embeds: [embed] });
});

readdirSync("./events").forEach(async (file) => {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

client.login(config.token);

// Küfür Engel
const bannedWords = fs.readFileSync('kufur-liste.txt', 'utf8').split('\n').map(word => word.trim());
client.on("messageCreate", (message) => {
    const kufur = db.fetch(`kufurengel_${message.guild.id}`);
    if (kufur) {
        if (!message.author.bot && message.channel.type !== "dm") {
            const content = message.content.toLowerCase();
            for (const bannedWord of bannedWords) {
                if (content.includes(bannedWord)) {
                    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
                        message.delete();
                        message.channel.send(`${message.author}, bu sunucuda küfür etmemelisin dostum.`).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 3000);
                        });
                    }
                    return;
                }
            }
        }
    }
});

// Reklam Engel
const bannedLinks = fs.readFileSync('domain-liste.txt', 'utf8').split('\n').map(word => word.trim());
client.on("messageCreate", (message) => {
    const reklam = db.fetch(`reklamengel_${message.guild.id}`);
    if (reklam) {
        if (!message.author.bot && message.channel.type !== "dm") {
            const content = message.content.toLowerCase();
            for (const bannedLink of bannedLinks) {
                if (content.includes(bannedLink)) {
                    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
                        message.delete();
                        message.channel.send(`${message.author}, bu sunucuda reklam yapamazsın!`).then(msg => {
                            setTimeout(() => {
                                msg.delete();
                            }, 2000);
                        });
                    }
                    return;
                }
            }
        }
    }
});

client.on("guildMemberAdd", member => {
    const rol = db.get(`otorol_${member.guild.id}`);
    if (rol) {
        member.roles.add(rol).catch(() => {});
    }
});

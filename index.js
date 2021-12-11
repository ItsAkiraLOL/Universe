const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MEMBERS ] });
const glob = require('glob')
const chalk = require('chalk')

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.json');
const guildSchema = require('./database/models/guild')

const fs = require('fs');

const CLIENT_ID = '853605214670159893';

//slash commands
const slash = [];
const slashFiles = glob.sync('./slashCommands/**/*.js');
client.slash = new Collection();

for (const file of slashFiles) {
	const slashCmd = require(file)
	slash.push(slashCmd.data.toJSON());
	client.slash.set(slashCmd.data.name, slashCmd);
}

//message commands
client.commands = new Map()
const commandFiles = glob.sync('./commands/**/*.js');

for (const file of commandFiles) {
	const command = require(file);
	client.commands.set(command.name, command);
}

//events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    console.log(`${chalk.cyanBright('[INTERACTIONS] Reloading application (/) commands.')}`);

    await rest.put(
		Routes.applicationCommands(CLIENT_ID),
      { body: slash },
    );

    console.log(`${chalk.cyanBright('[INTERACTIONS] Successfully reloaded application (/) commands.')}`);
  } catch (error) {
    console.error(error);
  }
})()

module.exports.commands = client.commands
module.exports.client = client

client.login(token);
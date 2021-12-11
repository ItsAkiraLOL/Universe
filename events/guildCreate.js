const guildSchema = require('../database/models/guild')
const chalk = require('chalk');

module.exports = {
	name: 'guildCreate',
	async execute(client, guild) {
        console.log(`${chalk.yellowBright('[GUILDS] Universe was added to a new guild, ' + guild.name + ', with ' + guild.memberCount + ' members.')}`)
        const data = await guildSchema.findOne({
            GuildID: guild.id,
        });

        if(!data) {
            await guildSchema.create({
                GuildID: guild.id,
            });
        }
        
    },
};
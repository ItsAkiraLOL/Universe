const { MessageEmbed } = require('discord.js');
const guildSchema = require('../database/models/guild')

module.exports = {
	name: 'channelCreate',
	async execute(client, channel) {

        const data = await guildSchema.findOne({
            GuildID: channel.guild.id,
        });

        if(!data) {
            await guildSchema.create({
                GuildID: channel.guild.id,
            });
        }

        const AuditLogFetch = await channel.guild.fetchAuditLogs({limit: 1, type: "CHANNEL_CREATE"});

        const logs = data.serverlogs

        if (!AuditLogFetch.entries.first()) return console.error(`No entries found.`);

        const Entry = AuditLogFetch.entries.first();

        const channelCreate = new MessageEmbed()
        .setTitle("A channel was created")
        // .setDescription(`${Entry.executor.tag || "Someone"} created a channel ${channel}`)
        .setDescription(`${Entry.executor.tag || "Someone"} created <#${channel.id}>`)
        client.channels.cache.get(`${logs}`).send({embeds: [channelCreate]});
    },
};
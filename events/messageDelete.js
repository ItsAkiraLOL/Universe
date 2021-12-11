const { MessageEmbed } = require('discord.js');
const guildSchema = require('../database/models/guild')

module.exports = {
	name: 'messageDelete',
    async execute(client, message) {

        const data = await guildSchema.findOne({
            GuildID: message.guild.id,
        });

        if(!data) {
            await guildSchema.create({
                GuildID: message.guild.id,
            });
        }
        const channel = data?.serverlogs
        if (channel) {
            if (message === '') return;

            if (message.author.id ===  '877219736214179911') return;

            const MessageDelete = new MessageEmbed()
            .setTitle(`❗️ Message deleted in ${message.channel.name}`)
            .setColor("RED")
            .setDescription(`${message}`)
            .setTimestamp()
            .setFooter(` ${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            client.channels.cache.get(`${channel}`).send({embeds: [MessageDelete]});
        } 
    }
};
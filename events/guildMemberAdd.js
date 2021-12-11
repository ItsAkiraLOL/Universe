const { MessageEmbed } = require('discord.js');
const guildSchema = require('../database/models/guild');
const moment = require('moment');
const tz = require('moment-timezone')

module.exports = {
    name: 'guildMemberAdd',
    async execute(client, member) {
        const findGuild = await guildSchema.findOne({
            GuildID: member.guild.id
        })

        if (findGuild?.autoRole) {
            const autoRole = findGuild.autoRole

            member.roles.add(autoRole)
        }

        if (findGuild?.serverlogs) {
            const channel = findGuild?.serverlogs
            const memberJoined = new MessageEmbed()
                .setAuthor('Member Has Joined')
                .setDescription(`
**Member Joined**
${member}

**Created At**
${moment(member.user.createdAt).tz('Europe/London').format('MMMM Do YYYY, h:mm:ss a')}

**Joined At**
${moment(Date.now()).tz('Europe/London').format('MMMM Do YYYY, h:mm:ss a')}
                `)
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter(`ID: ${member.id}`)
                .setTimestamp()
                .setColor('GREEN')

                client.channels.cache.get(`${channel}`).send({embeds: [memberJoined] });
        }
    }
}
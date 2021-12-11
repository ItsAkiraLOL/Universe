const { MessageEmbed, Permissions } = require('discord.js');
const guildSchema = require('../../database/models/guild');
const wait = require('util').promisify(setTimeout);

module.exports = {
    name: 'kick',
    description: 'Kick a member from the server.',
    category: 'Moderation',
    async execute(message, args, client) {

        if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const cantKick = new MessageEmbed()
                .setAuthor(`❌ Incorrect Permisisons!`)
                .setDescription('Sorry, I can not kick anyone due to not having the ``KICK MEMBERS`` permission!')
                .setColor('RED')
                return message.reply({ embeds: [cantKick], ephemeral: true });
        }
    
        if (!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
            const deniedKick = new MessageEmbed()
            .setTitle('❌ Incorrect Permisisons!')
            .setDescription('Sorry, you can not run this command due to not having the ```KICK MEMBERS``` permission!')
            .setColor('RED')
            return message.reply({ embeds: [deniedKick] });
        }
        
        const mentionedMember = message.mentions.members.first();
        const reason = args.slice(2).join(' ') || 'Not specified';

        const botRoles = message.guild.me.roles.highest.position;
        const memberRoles = mentionedMember.roles.highest.position;
        const authorRoles = message.member.roles.highest.position;

        const error1 = new MessageEmbed()
            .setAuthor(`❌ Unable to Kick`)
            .setDescription(`Sorry, you can **not** kick yourself!`)
            .setColor('RED')

        if(message.member.id === mentionedMember.id) return message.reply({ embeds: [error1] })

        const error2 = new MessageEmbed()
            .setAuthor(`❌ Unable to Kick`)
            .setDescription(`I can not kick this user to their roles being higher than mine!`)
            .setColor('RED')

        if (memberRoles > botRoles) return message.reply({ embeds: [error2] });

        const error3 = new MessageEmbed()
            .setAuthor(`❌ Unable to Kick`)
            .setDescription(`You can not kick this user to their roles being higher than yours!`)
            .setColor('RED')

        if (memberRoles > authorRoles) return message.reply({ embeds: [error3] });

        const error4 = new MessageEmbed()
            .setAuthor(`❌ Unable to Kick`)
            .setDescription(`You can not kick this user due to them being the same role as you!`)
            .setColor('RED')

        if (memberRoles === authorRoles) return message.reply({ embeds: [error4] }); 
    
        const success = new MessageEmbed()
        .setAuthor(`✔️ Success!`)
        .setDescription(`${mentionedMember} has been kicked!`)
        .setColor('GREEN')

    const findLogChan = await guildSchema.findOne({
        GuildID: message.guild.id
    })

    const channel = findLogChan?.serverlogs
    const modlog = findLogChan?.modlogs

    if (channel) {
        if (modlog === true) {
            const kickEmbed = new MessageEmbed()
            .setAuthor(`${mentionedMember.user.tag} was kicked!`)
            .setDescription(`
**Reason:**
${reason}

**Moderator:**
${message.member}
            `)
            .setThumbnail(mentionedMember.user.displayAvatarURL())
            .setColor('YELLOW')
            .setTimestamp()

            client.channels.cache.get(channel).send({embeds: [kickEmbed] });
        }
    }

    mentionedMember.kick()
    return message.reply({ embeds: [success] });
    }
}
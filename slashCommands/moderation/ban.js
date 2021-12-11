const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const guildSchema = require('../../database/models/guild');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member from the server')
        .addUserOption(option => 
            option.setName('user')
            .setDescription('Select a user')
            .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
            .setDescription('Reason for the ban')
            .setRequired(false)),
    async execute(interaction, client) {
        const mentionedMember = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason') || 'Not specified'

        if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            const cantBan = new MessageEmbed()
                .setAuthor(`❌ Incorrect Permisisons!`)
                .setDescription('Sorry, I can not ban anyone due to not having the ``BAN MEMBERS`` permission!')
                .setColor('RED')
                return interaction.reply({ embeds: [cantBan], ephemeral: true });
        }
        
        if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
            const denyBan = new MessageEmbed()
            .setTitle('❌ Incorrect Permisisons!')
            .setDescription('Sorry, you can not run this command due to not having the ```BAN MEMBERS``` permission!')
            .setColor('RED')
            return interaction.reply({ embeds: [denyBan], ephemeral: true });
        }

        const botRoles = interaction.guild.me.roles.highest.position
        const memberRoles = mentionedMember.roles.highest.position;
        const authorRoles = interaction.member.roles.highest.position;

        const error1 = new MessageEmbed()
            .setAuthor(`❌ Unable to Ban`)
            .setDescription(`Sorry, you can **not** ban yourself!`)
            .setColor('RED')

        if(interaction.member.id === mentionedMember.id) return interaction.reply({ embeds: [error1], ephemeral: true })

        const error2 = new MessageEmbed()
            .setAuthor(`❌ Unable to Ban`)
            .setDescription(`I can not ban this user to their roles being higher than mine!`)
            .setColor('RED')

        if (memberRoles > botRoles) return interaction.reply({ embeds: [error2], ephemeral: true });

        const error3 = new MessageEmbed()
            .setAuthor(`❌ Unable to Ban`)
            .setDescription(`You can not ban this user to their roles being higher than yours!`)
            .setColor('RED')

        if (memberRoles > authorRoles) return interaction.reply({ embeds: [error3], ephemeral: true });

        const error4 = new MessageEmbed()
            .setAuthor(`❌ Unable to Ban`)
            .setDescription(`You can not ban this user due to them being the same role as you!`)
            .setColor('RED')

        if (memberRoles === authorRoles) return interaction.reply({ embeds: [error4], ephemeral: true }); 

        const success = new MessageEmbed()
            .setAuthor(`✔️ Success!`)
            .setDescription(`${mentionedMember} has been banned!`)
            .setColor('GREEN')

        const findLogChan = await guildSchema.findOne({
            GuildID: interaction.guild.id
        })

        const channel = findLogChan?.serverlogs
        const modlog = findLogChan?.modlogs

        if (channel) {
            if (modlog === true) {
                const banEmbed = new MessageEmbed()
                .setAuthor(`${mentionedMember.user.tag} was banned!`)
                .setDescription(`
**Reason:**
${reason}
    
**Moderator:**
${interaction.member}
                `)
                .setThumbnail(mentionedMember.user.displayAvatarURL())
                .setColor('RED')
                .setTimestamp()
    
                client.channels.cache.get(channel).send({embeds: [banEmbed]});
            }
        }

        mentionedMember.ban()
        return interaction.reply({ embeds: [success], ephemeral: true });
    }
}
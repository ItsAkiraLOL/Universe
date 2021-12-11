const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const guildSchema = require('../../database/models/guild');
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription(`Mute a user.`)
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user you want to mute.'))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('The reason for the mute.')
                .setRequired(false))
        .addStringOption(option => 
            option.setName('time')
                .setDescription('The time you want to mute them for.')
                .setRequired(false)),
    async execute(interaction) {    
        const mentionedMember = interaction.options.getMember('user')
        const reason = interaction.options.getString('reason') || 'Not specified'
        const time = interaction.options.getString('time')

        const findGuild = await guildSchema.findOne({
            GuildID: interaction.guild.id,
        })

        const muteRole = interaction.guild.roles.cache.get(findGuild?.muteRole);

        if (!findGuild?.muteRole) {
            return interaction.reply('Please set a mute role before trying to mute!')
        }

        let memberTarget = interaction.guild.members.cache.get(mentionedMember.id);

        if (!time) {
            memberTarget.roles.add(muteRole.id)
            return interaction.reply(`Muted ${mentionedMember}`)
        }

        memberTarget.roles.add(muteRole.id)
        interaction.reply(`Muted ${mentionedMember} for ${ms(ms(time))}`)

        setTimeout(function () {
            memberTarget.roles.remove(muteRole.id);
        }, ms(time));
    }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const guildSchema = require('../../database/models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription(`Clear a specific amount of messages in a channel.`)
        .addStringOption(option => 
            option.setName('amount')
                .setDescription('The amount of messages to clear.')
                .setRequired(true))
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel you want to clear the messages in.')
                .setRequired(false)),
    async execute(interaction) {    
        const channel = interaction.options.getChannel('channel') || interaction.channel;
        const amountParsed = parseInt(interaction.options.getString('amount'));
        if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
            return interaction.reply({content: `You do not have the correct permissions required to run this command, you need the **Manage Messages** permission.`, ephemeral: true})
        }else {
            if(amountParsed === 0) {
                return interaction.reply({content: `Please select more than 1 message to purge.`, ephemeral: true})
            }
            if (amountParsed > 100) {
                return interaction.reply({content: 'You cannot delete more than 100 messages at a time.', ephemeral: true});
            }
            channel.bulkDelete(amountParsed);
        }

        const findLogChan = await guildSchema.findOne({
            GuildID: interaction.guild.id
        })

        const channel2 = findLogChan?.serverlogs
        const modlog = findLogChan?.modlogs

        if(channel2) {
            if(modlog === true) {
                const purgeEmbed = new MessageEmbed()
                .setColor('YELLOW')
                .setTitle(`Channel Purge`)
                .addField('Amount:', `${amountParsed}`, true)
                .addField('User:', `<@${interaction.user.id}>`, true)
                .addField('Channel:', `<#${channel.id}>`, true)
                .setTimestamp(Date.now())

                interaction.client.channels.cache.get(channel2).send({embeds: [purgeEmbed]});
            }
        }

        return interaction.reply({ content: `**${amountParsed}** messages were cleared from <#${channel.id}>.`, ephemeral: true})
        
    }
}
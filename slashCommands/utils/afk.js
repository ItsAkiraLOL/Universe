const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmebd } = require('discord.js');
const profileSchema = require('../../database/models/profile')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Afk in the server')
        .addStringOption(option =>
            option.setName('message')
            .setDescription('Message for when someone pings you')
            .setRequired(true)),
    async execute(interaction) {
        const message = interaction.options.getString('message');

        await profileSchema.findOneAndUpdate({
            userID: interaction.member.id
        }, {
            afk: true,
            afkGuild: interaction.guild.id,
            afkMessage: message,
            afkSince: Date.now()
        })
        return interaction.reply(`Afk has been set! You set the msg as ${message}`)
    }
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const profileSchema = require('../../database/models/profile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setcolour')
        .setDescription(`Manage the favourite colour that's shown on your profile.`)
        .addStringOption(option => 
            option.setName('colour')
                .setDescription(`The colour you'd like to choose.`)
                .setRequired(true)
                .addChoice('Red', 'Red')
                .addChoice('Blue', 'Blue')
                .addChoice('Purple', 'Purple')
                .addChoice('Lilac', 'Lilac')
                .addChoice('Green', 'Green')
                .addChoice('Yellow', 'Yellow')
                .addChoice('Orange', 'Orange')
                .addChoice('Violet', 'Violet')
                .addChoice('Black', 'Black')
                .addChoice('White', 'White')
                .addChoice('Lime', 'Lime')),
    async execute(interaction) {
        const findUser = await profileSchema.findOne({
            userID: interaction.user.id
        })

        if (!findUser) await profileSchema.create({
            userID: interaction.user.id,
            userName: interaction.user.tag
        })

        const colour = interaction.options.getString('colour');

        const updatedColour = new MessageEmbed()
            .setAuthor('Profile updated.')
            .setDescription(`Your favourite colour has been set to: **${colour}**`)
            .setColor('GREEN')

        await profileSchema.findOneAndUpdate({
            userID: interaction.user.id
        }, {
            favcolor: colour
        })

        return interaction.reply({ embeds: [updatedColour] })
    }
}
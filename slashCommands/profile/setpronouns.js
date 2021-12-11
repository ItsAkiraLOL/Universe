const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const profileSchema = require('../../database/models/profile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setpronouns')
        .setDescription(`Manage your pronouns that are shown on your profile.`)
        .addStringOption(option => 
            option.setName('pronouns')
                .setDescription('Please enter your pronouns.')
                .setRequired(true)),
    async execute(interaction) {    
        const findUser = await profileSchema.findOne({
            userID: interaction.user.id
        })

        if (!findUser) await profileSchema.create({
            userID: interaction.user.id,
            userName: interaction.user.tag
        }); 

        const pronouns = interaction.options.getString('pronouns')
        
        await profileSchema.findOneAndUpdate({
            userID: interaction.user.id
        }, {
            pronouns
        })

        const updatedPronouns = new MessageEmbed()
        .setAuthor('Profile updated.')
        .setDescription(`Your pronouns have been set to: **${pronouns}**`)
        .setColor('GREEN')

        return interaction.reply({ embeds: [updatedPronouns] })
    }
}
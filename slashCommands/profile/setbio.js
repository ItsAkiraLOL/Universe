const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const profile = require('../../database/models/profile');
const profileSchema = require('../../database/models/profile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setbio')
        .setDescription(`Manage the bio that's shown on your profile.`)
        .addStringOption(option => 
            option.setName('bio')
                .setDescription(`The content you'd like to display in your bio.`)
                .setRequired(true)),
    async execute(interaction) {
        const findUser = await profileSchema.findOne({
            userID: interaction.user.id
        });

        if (!findUser) await profileSchema.create({
            userID: interaction.user.id,
            userName: interaction.user.tag
        });

        const bannedWords = [
            'fag',
            'f@g',
            'faggot',
            'cunt'
        ]

        const bio = interaction.options.getString('bio')
        if(bio.length >= 500) {
            return interaction.reply({content: 'Please ensure that your bio is under **500** characters.', ephemeral: true})
        }
        const bannedWordBio = new MessageEmbed()
            .setAuthor(`There was an error.`)
            .setDescription(`A blacklisted word was found in your bio, which is ||${bio}||, please remove it and try again.`)
            .setColor('RED')

        if (bio.includes(bannedWords)) return interaction.reply({ embeds: [bannedWordBio], ephemeral: true })

        await profileSchema.findOneAndUpdate({
            userID: interaction.user.id
        }, {
            description: bio
        })

        const updatedBio = new MessageEmbed()
        .setAuthor('Profile updated.')
        .setDescription(`Your bio has been set to: **${bio}**`)
        .setColor('GREEN')
        return interaction.reply({ embeds: [updatedBio] });
    }
}
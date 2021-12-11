const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const profileSchema = require('../../database/models/profile');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('View your user profile.')
        .addUserOption(option => 
            option.setName('user')
                .setDescription(`The user who's profile you would like to view.`)
                .setRequired(false)),
	async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const findUser = await profileSchema.findOne({
            userID: user.id
        })

        if (!findUser) {
            await profileSchema.create({
                userID: user.id,
                userName: user.tag
            })
        }

        const bio = findUser.description

        const pronouns = findUser.pronouns

        const favcolor = findUser.favcolor

        const pfp = user.displayAvatarURL()

        const Profile = new MessageEmbed()
        .setAuthor(`${findUser.userName}'s Profile`)
        .setThumbnail(pfp)
        .addField('Bio:', `${bio || 'None set.'}`)
        .addField('Pronouns:', `${pronouns || 'None set.'}`, true)
        .addField('Favourite Colour:', `${favcolor || 'None set.'}`, true)

        if (favcolor === 'Red') {
            Profile.setColor('RED')
        }
        if (favcolor === 'Blue') {
            Profile.setColor('BLUE')
        } 
        if (favcolor === 'Purple') {
            Profile.setColor('PURPLE')
        }
        if (favcolor === 'Lilac') {
            Profile.setColor('#c8a2c8')
        }
        if (favcolor === 'Green') {
            Profile.setColor('GREEN')
        }
        if (favcolor === 'Yellow') {
            Profile.setColor('YELLOW')
        }
        if (favcolor === 'Orange') {
            Profile.setColor('ORANAGE')
        }
        if (favcolor === 'Violet') {
            Profile.setColor('#ee82ee')
        }
        if (favcolor === 'Black') {
            Profile.setColor('BLACK')
        }
        if (favcolor === 'Brown') {
            Profile.setColor('#A52A2A')
        }
        if (favcolor === 'White') {
            Profile.setColor('WHITE')
        }
        if (favcolor === 'Lime') {
            Profile.setColor('#bfff00')
        }

		await interaction.reply({ embeds: [Profile] });
	},
};
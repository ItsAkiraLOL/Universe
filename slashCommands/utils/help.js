const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Replies with the help page!')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The help category')
                .addChoice('Moderation', 'moderation')
                .addChoice('Profile', 'profile')
                .addChoice('Utils', 'utils')
                .addChoice('Config', 'config')),
        async execute(interaction) {
        const string = interaction.options.getString('category');

		if (string === 'moderation') {
            const moderationEmbed = new MessageEmbed()
            .setAuthor('Moderation Commands')
            .setDescription(`
**clear** -> Clear messages inside a channel!
**kick** -> Kick a user from your server!
            `)
            .setColor('#2F3136')
            return interaction.reply({ embeds: [moderationEmbed] })
        } else if (string === 'config') {
            const configEmbed = new MessageEmbed()
            .setAuthor('Config Commands')
            .setDescription(`
**setmodlogs** -> Choose if you get logs for moderation commands!
**setserverlogs** -> Sets your logs channel in your server!
            `)
            .setColor('#2F3136')
            return interaction.reply({ embeds: [configEmbed] });
        } else if (string === 'profile') {
            const profileEmbed = new MessageEmbed()
            .setAuthor('Profile Commands')
            .setDescription(`
**profile** -> View your profile!
**setbio** -> Set your bio on your profile!
**setcolour** -> Set your favourite colour on your profile!
**setpronouns** -> Set your pronouns on your profile!
            `)
            .setColor('#2F3136')
            return interaction.reply({ embeds: [profileEmbed] });
        } else if (string === 'utils') {
            const utilsEmbed = new MessageEmbed()
            .setAuthor('Utils Commands!')
            .setDescription(`
**help** -> Shows these embeds!
**ping** -> Shows the ping of the bot!
            `)
            .setColor('#2F3136')
            return interaction.reply({ embeds: [utilsEmbed] })
        } else {
            const helpEmbed = new MessageEmbed()
            .setAuthor('Help Categories!')
            .setDescription(`
**/help moderation** or **u!help moderation** -> View moderation commands!
**/help profile** or **u!help profile** -> View profile commands!
**/help config** or **u!help config** -> View config commands!
**/help utils** or **u!help utils** -> View utils commands!
            `)
            .setColor('#2F3136')
            return interaction.reply({ embeds: [helpEmbed] });
        }
	},
};
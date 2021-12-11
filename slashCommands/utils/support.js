const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('support')
		.setDescription('Join the official Universe support server!'),
	async execute(interaction) {
        await interaction.reply("You can join our support server here: https://discord.gg/3EkY5bB8");
	},
};
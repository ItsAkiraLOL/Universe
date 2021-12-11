const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
    .setName('ping')
	.setDescription ('Shows the ping of the bot'),
    async execute(interaction, client) {
    const PingEmbed = new MessageEmbed()
      .setTitle('🤖 Universe Ping')
      .setDescription(`Ping: ${client.ws.ping} ms.`)
      .setColor('GREEN')
    const msg = await interaction.reply({ embeds: [PingEmbed]});
    const message = await interaction.fetchReply();
    const PingEmbed2 = new MessageEmbed()
		.setTitle('🤖 Universe Ping')
		.setDescription(`Ping: ${client.ws.ping} ms.\nMessage Ping: ${
			message.createdTimestamp - interaction.createdTimestamp
		} ms.`)
    .setColor('GREEN')
    await wait(1000)
    message.edit({ embeds: [PingEmbed2] })
  }
} 

       


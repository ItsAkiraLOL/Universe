const { MessageEmbed } = require('discord.js');
const { execute } = require('./help');
const wait = require('util').promisify(setTimeout);

module.exports = {
	name: 'ping',
	description: "Shows the ping of the bot!",
	permission: "SEND_MESSAGES",
	category: 'Utils',
	async execute(message, args, client) {
     const PingEmbed = new MessageEmbed()
	 .setTitle('🤖 Universe Ping')
	 .setDescription(`Ping: ${client.ws.ping} ms.`)
	 .setColor('GREEN')
         
		const msg = await message.reply({ embeds: [PingEmbed] })

		const PingEmbed2 = new MessageEmbed()
		.setTitle('🤖 Universe Ping')
		.setDescription(`Ping: ${client.ws.ping} ms.\nMessage Ping: ${
			msg.createdTimestamp - message.createdTimestamp
		} ms.`)
		.setColor('GREEN')
		await wait(1000)
		msg.edit({ embeds: [PingEmbed2] })
    }
}
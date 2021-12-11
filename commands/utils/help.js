const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'help',
    category: 'Utils',
    async execute(message, args, client) {
        const category = args[1]

        const categories = [
            'Moderation',
            'Config',
            'Fun'
        ].toString().toLowerCase()
        
        if (!categories.includes(category)) {
            return message.reply('Please choose a category and redo the command: Moderation, Config, Fun or Utils!')
        }

        if (args[1] === 'Moderation') {
            const moderationEmbed = new MessageEmbed()
            .setAuthor('Moderation Commands')
            .setDescription(`Coming Soon to your Servers!`)
            .setColor('RED')
            return message.reply({ embeds: [moderationEmbed] });
        }

        return message.channel.send('help')
    }
}
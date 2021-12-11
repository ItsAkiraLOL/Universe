const { MessageEmbed } = require('discord.js');
const profileSchema = require('../../database/models/profile');
 
module.exports = {
    name: 'setbio',
    category: 'Profile',
    description: 'Set bio for your prfile',
    async execute(message, args, client) {
        const findUser = await profileSchema.findOne({
            userID: message.author.id
        })

        if (!findUser) await profileSchema.create({
            userID: message.author.id,
            userName: message.author.tag
        })

        const bannedWords = [
            'fag'
        ]

        const bio = args.slice(1).join(' ');

        if (!bio) return message.channel.send('In the same messgae, enter your bio');

        if (bio.includes(bannedWords)) return message.channel.send('Your bio mentions a bad word. Please change it!')

        await profileSchema.findOneAndUpdate({
            userID: message.author.id,
        }, {
            description: bio
        })

        const updatedBio = new MessageEmbed()
        .setAuthor(`Description Updated`)
        .setDescription(`I have now set your profile description to: **${bio}**`)
        .setColor('GREEN')    

        return message.reply({ embeds: [updatedBio], ephemeral: true })
    }
}
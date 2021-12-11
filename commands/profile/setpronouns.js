const { MessageEmbed } = require('discord.js');
const profileSchema = require('../../database/models/profile');

module.exports = {
    name: 'setpronouns',
    category: 'Profile',
    description: 'Set pronouns',
    async execute(message, args, client) {
        const findUser = await profileSchema.findOne({
            userID: message.author.id
        })

        if (!findUser) await profileSchema.create({
            userID: message.author.id,
            userName: message.author.tag
        })

        const pronouns = args.slice(1).join(' ');

        await profileSchema.findOneAndUpdate({
            userID: message.author.id
        }, {
            pronouns
        })

        const updatedBio = new MessageEmbed()
        .setAuthor(`Description Updated`)
        .setDescription(`I have now set your profile pronouns to: **${pronouns}**`)
        .setColor('GREEN')

        return message.reply({ embeds: [updatedBio] });
    }
}
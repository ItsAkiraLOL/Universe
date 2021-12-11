const { MessageEmbed } = require('discord.js');
const profileSchema = require('../../database/models/profile');

module.exports = {
    name: 'profile',
    category: 'Profile',
    async execute(message, args, client) {
        
        const findUser = await profileSchema.findOne({
            userID: message.author.id
        })

        if (!findUser) await profileSchema.create({
                userID: message.author.id,
                userName: message.author.tag
            })
    

        const bio = findUser.description

        const pronouns = findUser.pronouns

        const Profile = new MessageEmbed()
        .setAuthor(`${findUser.userName}'s Profile`)
        .setDescription(`
**Description:**
${bio || 'None set'}

**Pronouns:**
${pronouns || 'None set'}

**Fav Colour:**
Coming Soon
        `)

		return message.reply({ embeds: [Profile] });

    }
}
const { prefix } = require('../config.json')
const profileSchema = require('../database/models/profile')
const guildSchema = require('../database/models/guild');

module.exports = {
	name: 'messageCreate',
	async execute(client, message) {
        if (message.author.bot) return;
        if (message.channel.type === 'dm') return;
        
        const findUser = await profileSchema.findOne({
            userID: message.author.id
        })
        
        if (!findUser) await profileSchema.create({
            userID: message.author.id,
            userName: message.author.tag
        })
    
        //find guild
        const findGuild = await guildSchema.findOne({
            GuildID: message.guild.id
        })
        
        if (!findGuild) await guildSchema.create({
            GuildID: message.guild.id
        })
        
    
        if (findUser?.afk === true) {
             profileSchema.findOne({ userID: message.member.id }, async (err, data) => {
                if (err) throw err;
                if (data) {
                    if (data.afkGuild.includes(message.guild.id)) {
                        for (let i = 0; i < data.afkGuild.length; i++) {
                            if (data.afkGuild[i] === message.guild.id) data.afkGuild.splice(i, 1)
                        }
                    
    
                        await data.save();
                    }
                }
            })
            await profileSchema.findOneAndUpdate({
                userID: message.member.id
            }, {
                afk: false,
                $unset: {
                    afkMessage: "",
                    afkSince: ""
                }
            })
            message.reply('I have removed your afk!')
        }
        
        if(!message.content.startsWith(prefix)) return;
    
        const args = message.content.substring(prefix.length).split(' ')
    
        const command = client.commands.get(args[0].toLowerCase())
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]))
     
        if (!command) return;
    
        const category = command.category
    
            try {
                command.execute(message, args, client )
            } catch (error) {
                console.log(error)
            }    
        } 
}
const profileSchema = require('../database/models/profile')
const guildSchema = require('../database/models/guild');

module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {
        if (!interaction.isCommand()) return;

        const command = client.slash.get(interaction.commandName);
      
        if (!command) return;

            //find user
        const findUser = await profileSchema.findOne({
            userID: interaction.member.id
        })
        
        if (!findUser) await profileSchema.create({
            userID: interaction.member.id,
            userName: interaction.member.tag
        })

        //find guild
        const findGuild = await guildSchema.findOne({
            GuildID: interaction.guild.id
        })

        if (!findGuild) await guildSchema.create({
            GuildID: interaction.guild.id
        })

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    },
};
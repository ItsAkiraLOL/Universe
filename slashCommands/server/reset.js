const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const guildSchema = require('../../database/models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reset')
        .setDescription('Resetting the configuration')
        .addStringOption(option => 
            option.setName('input')
            .setDescription('Input what you want to setup')
            .addChoice('Serverlogs', 'Serverlogs')
            .addChoice('Modlogs', 'Modlogs')
            .addChoice('Autorole', 'Autorole')
            .addChoice('Muterole', 'Muterole')
            .addChoice('All', 'all')),
    async execute(interaction, client) {

        const data = await guildSchema.findOne({
            GuildID: interaction.guild.id,
        });


        const setup = interaction.options.getString('input');

        if (!setup) {
            const resetembed = new MessageEmbed()
            .setTitle("🤖 How do I reset the Universe configuration?")
            .setColor("WHITE")
            .setDescription("You must start every command with /reset, you may have noticed that the input is optional! Here is the list of things to enter as an input:")
            .addField("- Serverlogs", "This allows you to reset where you want the bot to send the serverlogs to.")
            .addField("- Modlogs", "This will allow you to reset the toggle to set modlogs as true or false.")
            .addField("- Autorole", "This allows you to reset the role that you want the users to recieve upon entry to your server.")
            .addField("- Muterole", "This allows you to reset the role that you want the user to recieve when you mute them.")
            .addField("- All", "This resets all of your options for your guild!")

            await interaction.reply({embeds: [resetembed]})
        }

        if (setup === "Serverlogs") {
            await guildSchema.findOneAndUpdate({
                GuildID: interaction.guild.id
            }, {
                $unset: {
                    serverlogs: "",
                }
            })
            await interaction.reply("✅ I have reset the serverlogs configuration")
        } else if (setup === "Modlogs") {
            await guildSchema.findOneAndUpdate({
                GuildID: interaction.guild.id
            }, {
                $unset: {
                    modlogs: "",
                }
            })
            await interaction.reply("✅ I have reset the modlogs configuration")
        } else if (setup === "Autorole") {
            await guildSchema.findOneAndUpdate({
                GuildID: interaction.guild.id
            }, {
                $unset: {
                    autoRole: "",
                }
            })
            await interaction.reply("✅ I have reset the Autorole configuration")
        } else if (setup === "Muterole") {
            await guildSchema.findOneAndUpdate({
                GuildID: interaction.guild.id
            }, {
                $unset: {
                    muteRole: "",
                }
            })
            await interaction.reply("✅ I have reset the muteRole configuration")
        } else if (setup === "all") {
            await guildSchema.findOneAndUpdate({
                GuildID: interaction.guild.id
            }, {
                $unset: {
                    serverlogs: "",
                    modlogs: "",
                    muteRole: "",
                    autoRole: "",
                }
            })
            await interaction.reply("✅ I have reset all of the guilds configuration")
        }
    } 
}
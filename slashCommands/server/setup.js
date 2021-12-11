const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Permissions } = require('discord.js');
const guildSchema = require('../../database/models/guild');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Setup the general configuration of the bot!')
        .addStringOption(option => 
            option.setName('input')
            .setDescription('Input what you want to setup')
            .addChoice('Serverlogs', 'Serverlogs')
            .addChoice('Modlogs', 'Modlogs')
            .addChoice('Autorole', 'Autorole')
            .addChoice('Muterole', 'Muterole')),
    async execute(interaction, client) {

        const data = await guildSchema.findOne({
            GuildID: interaction.guild.id,
        });


        const setup = interaction.options.getString('input');

        if (!setup) {
            const setupembed = new MessageEmbed()
            .setTitle("🤖 How do I setup the Universe configuration?")
            .setColor("WHITE")
            .setDescription("You must start every command with /setup, you may have noticed that the input is optional! Here is the list of things to enter as an input:")
            .addField("- Serverlogs", "This allows you to set where you want the bot to send the serverlogs to.")
            .addField("- Modlogs", "This will allow you to toggle the modlogs as true or false.")
            .addField("- Autorole", "This allows you to select the role that you want the users to recieve upon entry to your server.")
            .addField("- Muterole", "This allows you to select the role that you want the user to recieve when you mute them.")

            await interaction.reply({embeds: [setupembed]})
        }

        if (setup === "Serverlogs") {
            if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return await interaction.reply({content: "❌ Invalid Permissions! You need ADMINISTRATOR permissions for this command!", ephemeral: true});
            if (data.serverlogs) return await interaction.reply(`❌ You already have serverlogs set as <#${data.serverlogs}>`)
            if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR && !data.serverlogs)) {
            await interaction.reply("Mention a channel where you want to send serverlogs too!")
            
            const filter = m => m.mentions.channels.first();

            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

            collector.on('collect', async m => {
	            console.log(`Collected ${m.content}`);

                const ServerlogsID = m.mentions.channels.first().id;

                if (data) {
                    await guildSchema.findOneAndUpdate({
                        GuildID: interaction.guild.id,
                        serverlogs: ServerlogsID
                    })
                }

                await interaction.editReply(`✅ I have successfully set server logs to send to ${m.content}!`)
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });

        }

        } else if (setup === "Modlogs") {
            if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return await interaction.reply({content: "❌ Invalid Permissions! You need ADMINISTRATOR permissions for this command!", ephemeral: true});
            if (data.modlogs) return await interaction.reply(`❌ You already have serverlogs set as ${data.modlogs}`)
            if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR && !data.modlogs)) {
            await interaction.reply("Please set modlogs as true or false")

            const filter = m => m.content.includes('true' || 'false');

            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

            collector.on('collect', async m => {
	            console.log(`Collected ${m.content}`);

                if (data) {
                    await guildSchema.findOneAndUpdate({
                        GuildID: interaction.guild.id,
                        modlogs: m.content
                    })
                }

                await interaction.editReply(`✅ I have successfully set mod logs as ${m.content}!`)
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });

            }

        } else if (setup === "Autorole") {
            if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return await interaction.reply({content: "❌ Invalid Permissions! You need ADMINISTRATOR permissions for this command!", ephemeral: true});
            if (data.autoRole) return await interaction.reply(`❌ You already have autoRole set as <@&${data.autoRole}>`)
            if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR && !data.autoRole)) {
            await interaction.reply("Mention the role that you want users to recieve upon entry to the server")

            const filter = m => m.mentions.roles.first();

            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

            collector.on('collect', async m => {
	            console.log(`Collected ${m.content}`);

                const AutoroleID = m.mentions.roles.first().id;

                if (data) {
                    await guildSchema.findOneAndUpdate({
                        GuildID: interaction.guild.id,
                        autoRole: AutoroleID
                    })
                }

                await interaction.editReply(`✅ I have successfully set auto role as ${m.content}!`)
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });

            }
        } else if (setup === "Muterole") {
            if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return await interaction.reply({content: "❌ Invalid Permissions! You need ADMINISTRATOR permissions for this command!", ephemeral: true});
            if (data.muteRole) return await interaction.reply(`❌ You already have muteRole set as <@&${data.muteRole}>`)
            if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR && !data.muteRole)) {
            await interaction.reply("Mention the role that you want users to recieve when they get muted!")

            const filter = m => m.mentions.roles.first();


            const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

            collector.on('collect', async m => {
	            console.log(`Collected ${m.content}`);

                const MuteroleID = m.mentions.roles.first().id;

                if (data) {
                    await guildSchema.findOneAndUpdate({
                        GuildID: interaction.guild.id,
                        muteRole: MuteroleID
                    })
                }

                await interaction.editReply(`✅ I have successfully set mute role as ${m.content}!`)
            });

            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });

            }
        }
    }
}
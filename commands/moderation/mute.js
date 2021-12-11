const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute member",
  category: "moderation",
  userPerms: ["MANAGE_ROLES"],
  botPerms: ["EMBED_LINKS", "MANAGE_ROLES"],

  async execute(message, args, client) {
    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send(
        `**${message.author.username}**, Please mention the user who you want to mute`
      );
    }

    if (user.id === message.owner.id) {
      return message.channel.send("You cannot mute the Server Owner");
    }

    if (user.id === message.author.id) {
      return message.channel.send(
        `**${message.author.username}**, You can't mute yourself`
      );
    }

    let reason = args.slice(1).join(" ");

    let muterole = message.guild.roles.cache.find((x) => x.name === "Muted");

    if (!muterole) {
     try {
				message.reply({
					content: `No mute role found, creating one!`, 
					allowedMentions: { repliedUser: true}
			    });
                muterole = await message.guild.roles.create({
                        name: 'Muted',
                        permissions: []
                });
                message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel, id) => {
                    await channel.permissionOverwrites.edit(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    })
                });
       
					message.channel.send({
						content: `The role <@&${muterole}> has been created`
                    });
       
			} catch (error) {
                console.log(error)
            }
        };

    if (user.roles.cache.has(muterole)) {
      return message.channel.send(`Given User is already muted`);
    }

    user.roles.add(muterole);

    const Muteembed = new MessageEmbed()
      .setTitle("Muted!")
      .setColor("RANDOM")
      .setDescription(
        `Action: Muted \nUser:${user} \nReason: ${reason} \nModerator: ${message.member} `
      );
    message.channel.send({ embeds: [embed] });
  },
};
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "announce",
    description: "Make a announcement",
    category: 'Utils',
    async execute(message, args, client) {
    const anchannel = message.mentions.channels.first();    
    if (!anchannel) {
        return message.channel.send("Usage: =announce <channel> <message>");
    }
    if (!args.slice(2).join(" ")) {
      return message.channel.send(
        "Please say something to announce smellies"
      );
    }

    const AnnounceEmbed = new MessageEmbed()
      .setTitle(`❗️ New Server Announcement`)
      .setDescription(args.slice(2).join(" "), {
        allowedMentions: { parse: ["users"] },
      })
      .setColor("RED")
      .setFooter(`Announcement by ${message.author.username}`);
      anchannel.send ({ embeds: [AnnounceEmbed] });

    const AnnounceEmbed2 = new MessageEmbed()
      .setTitle("Done you did it *sings dora the explorer song*!")
      .setDescription(`Announcement has been sent to ${anchannel}`)
      .setColor("GREEN");

    message.channel.send({ embeds: [AnnounceEmbed2] });
    message.delete();
  },
};
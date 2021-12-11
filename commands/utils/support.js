const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "support",
    description: "Get the invite link to the support server.",
    category: "utils",
    async execute(message, args, client) {
      const SupportEmbed = new MessageEmbed()
      .setTitle('🤖 Universe Support')
      .setDescription("Get Support [Here](https://discord.gg/3EkY5bB8)")
      .setColor("ORANGE")
      return message.channel.send({ embeds: [SupportEmbed] })
  
    }
}



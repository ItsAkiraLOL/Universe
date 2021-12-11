const Discord = module.require("discord.js");

module.exports = {
    name: "howgay",
    description: "To see how gay you are :)",
    category: "Fun",

    async execute(message, args, client) {
    const target = message.mentions.members.first() || message.member
     let rng = Math.floor(Math.random() * 101);

     const howgayembed = new Discord.MessageEmbed()
       .setTitle(`Universe's Gay Machine`)
       .setDescription(`${target} is ${rng}% Gay 🏳️‍🌈`)
       .setColor("RANDOM");
 
     message.channel.send({ embeds: [howgayembed] });
   },
 };

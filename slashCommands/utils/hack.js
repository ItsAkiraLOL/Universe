const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Message } = require('discord.js');

function wait(ms){
    let start = new Date().getTime();
    let end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hack')
		.setDescription('Get hacked nerd!1!!!!1')
        .addUserOption(option => 
            option.setName('user')
                .setDescription(`The user who you want to hack.`)
                .setRequired(false)),
	async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        interaction.channel.send(`Beginning hack on <@${user.id}>...`).then(async msg => {
            msg.edit('Digging into Discord mainframe...')
            wait(500)
            msg.edit('Locating database server...')
            wait(500)
            msg.edit('Located user account & password')
            wait(500)
            msg.edit('Found account, confirming information on the Discord central control system!')
            wait(500)
            msg.edit(`<@${user.id}>'s password is: ||${makeid(8)}|| and their email is ||${user.username}${makeid(12)}@${makeid(5)}.net||.`)
            await interaction.reply('Hacked user!')
        })
	},
};
const chalk = require('chalk');
const mongoose = require('../database/db')
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`${chalk.blueBright('[BOT] Successfully connected to Discord as ' + client.user.tag + '.')} `);

		mongoose.init()
	},
};

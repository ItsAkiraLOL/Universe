const mongoose = require('mongoose')
const chalk = require('chalk')
const { mongouser, mongopass } = require('../config.json')

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        
        mongoose.connect(`mongodb+srv://${mongouser}:${mongopass}@cluster0.oyzom.mongodb.net/UniverseBot?retryWrites=true&w=majority`, dbOptions)
        .then(console.log(`${chalk.greenBright('[DATABASE] Successfully connected to MongoDB.')}`))
        .catch(error => console.log(error))           
    }
}
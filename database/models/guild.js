const mongoose = require('mongoose')

const guildSchema = mongoose.Schema({
    GuildID: {
        type: String,
        required: true,
    },
    serverlogs: {
        type: String,
    },
    modlogs: {
        type: Boolean
    },
    muteRole: {
        type: String,
    },
    autoRole: {
        type: String,
    },
})

module.exports = mongoose.model("Guilds", guildSchema);
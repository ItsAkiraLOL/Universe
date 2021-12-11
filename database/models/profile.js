const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
    },
    marriedTo: {
        type: String,
    },
    timeMarried: {
        type: Number
    },
    description: {
        type: String
    },
    pronouns: {
        type: String
    },
    favcolor: {
        type: String,
    },
    afk: {
        type: Boolean
    },
    afkMessage: {
        type: String
    },
    afkSince: {
        type: Number
    },
    afkGuild: {
        type: Array,
    },
})

module.exports = mongoose.model("Profiles", profileSchema);

const mongoose = require("mongoose")

const Agent = mongoose.model('Agent', {
    name: String,
    login: String,
    medias: {
        voice: {
            min: Number,
            max: Number,
            selected: Number,
            handleMode: String,
            device: String,
            devicePassword: String
        },
        email: {
            min: Number,
            max: Number,
            selected: Number,
        },
        chat: {
            min: Number,
            max: Number,
            selected: Number,
            handleMode: String
        }
    },
    password: String
})
export default Agent
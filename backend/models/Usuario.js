const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        min: 4,
        max: 256
    },
    email: {
        type: String,
        required: true,
        min: 4,
        max: 1024
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("User", userSchema)
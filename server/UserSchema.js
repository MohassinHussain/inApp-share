const mongoose = require('mongoose')

const mateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
    },
    mates: {
        type: [mateSchema],
    }
})

const userCollection =  mongoose.model("userCollection", userSchema)

module.exports = userCollection
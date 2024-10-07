const mongoose = require('mongoose')

const shareSchema = new mongoose.Schema({
    senderEmail: {
        type: String,
        // required: true, 
    },
    recipient: {
        type: String,
        // required: true, 
    },
    recipientEmail: {
        type: String,
        // required: true, 
    },
    videoId: {
        type: String,
        // required: true, 
    },
    videoTitle: {
        type: String,
        // required: true, 
    },
    msgToReceiver: {
        type: String,
        // required: true, 
    },
})

const newCollection =  mongoose.model("newCollection", shareSchema)

module.exports = newCollection
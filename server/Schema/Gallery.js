const mongoose = require('mongoose')

const gallery = new mongoose.Schema(
    { 
        videoId: String, 
        videoCategory: String,
        videoAddedDate: {type: Date, default: Date.now},
        ownerId: {type: String, default: null}
    }
);

module.exports = mongoose.model("Gallery",gallery)
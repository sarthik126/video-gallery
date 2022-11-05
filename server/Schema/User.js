const mongoose = require('mongoose')

const user = new mongoose.Schema(
    { 
        username: String, 
        password: String,
        ownerId: String,
        userCreatedDate: {type: Date, default: Date.now}
    }
);

module.exports = mongoose.model("User",user)
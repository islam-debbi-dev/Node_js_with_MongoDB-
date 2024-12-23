const { name } = require('ejs');
const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;
const usersSchema = new Schema({
            name: String,
            age: Number,
            email: String,
            password: String,
            Date: {
                type: Date,
                default: Date.now
            },
            sex: {
                type: Boolean,
                default: true,
            },

});

const user = mongoose.model('users', usersSchema);

module.exports = user;
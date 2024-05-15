const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    userID:{
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Admin",adminSchema);
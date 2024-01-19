const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audiobookSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    audio: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('AudioBook',audiobookSchema);
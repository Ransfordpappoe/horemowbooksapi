const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    // id: {
    //     type: String,
    //     required: true
    // },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    bookcontent: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: true
    },
    authorPic: {
        type: String,
        required: false
    },
    booknum: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Book',bookSchema);
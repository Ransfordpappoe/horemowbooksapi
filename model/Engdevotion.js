const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const engdevotionSchema = new Schema({
    // id: {
    //     type: String,
    //     required: true
    // },
    title: {
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
    }
});
module.exports = mongoose.model('Engdevotion',engdevotionSchema);
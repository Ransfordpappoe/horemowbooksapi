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
    bookcontent2: {
        type: String,
        required: false
    },
    bookcontent3: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Engdevotion',engdevotionSchema);
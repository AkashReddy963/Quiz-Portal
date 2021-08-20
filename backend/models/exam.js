const mongoose = require('mongoose');
let Examslist = new mongoose.Schema({
    examname: {
        type: String,
        required: true
    },
    examdescription: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    examinername: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Available','Unavailable'],
        default: 'Available'
    }
});
module.exports = mongoose.model('Examslist', Examslist);
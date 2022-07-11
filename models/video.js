const mongoose = require('mongoose')
const yup = require('yup');

// VIDEOS SCHEMA
const videoSchema = mongoose.Schema({
    name : {
        type: String,
        required : true,
        minlength: 10,
        maxlength:100
    },
    youtubeId : {
        type: String,
        required : true
    },
    categories : {
        cat_name: {
            type: String,
            required: true,
        }
    }
})

exports.Video = new mongoose.model('Video', videoSchema);
const mongoose = require('mongoose')
const yup = require('yup');

const userSchema = mongoose.Schema({
    nama : {
        type: String,
        required: true,
        max: 255
    },
    email : {
        type: String,
        required : true,
        max: 100
    },
    password : {
        type: String,
        required : true,
        min: 6,
        max: 1024
    },
    createdAt : {
        type : Date,
        default: Date.now
    }
})

const validateUser = user => {
    const schema = yup.object().shape({
        nama: yup.string().required().max(255),
        email: yup.string().email().required().max(100),
        password: yup.string().required().min(6).max(1024),
    })
    return schema
    .validate(user)
    .then((user) => user)
    .catch(error => {
        return {
            message:error.message
        }
    })
}


exports.User = new mongoose.model('User', userSchema);
exports.validateUser = validateUser;
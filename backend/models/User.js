const mongoose = require('mongoose')
const marked = require('marked')
const createDompurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify= createDompurify(new JSDOM().window)

const UserSchema  = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Users', UserSchema)

const mongoose = require('mongoose')
const marked = require('marked')
const createDompurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify= createDompurify(new JSDOM().window)

const blogSchema  = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    title:{
        type:String,
        required:true,
    },
    categories:{
        type:String,
        default:"General"
    },
    discription:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model('Blogs', blogSchema)
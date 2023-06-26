const mongoose = require('mongoose');
const mongooseURI='mongodb://127.0.0.1:27017/test'

const connectToMongo =async ()=>{
    await mongoose.connect(mongooseURI)
    console.log("connect to MongoDB")
}

module.exports = connectToMongo




const mongoose = require('mongoose');
const mongooseURI='mongodb://127.0.0.1:27017/test'

const connectToMongo =async ()=>{
    await mongoose.connect(mongooseURI)
    console.log("connect to MongoDB")

}


// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian mewow' });
// kitty.save().then(() => console.log('meow meow'));

module.exports = connectToMongo




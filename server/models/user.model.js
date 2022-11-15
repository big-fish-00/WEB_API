const mongoose = require('mongoose'); 

const User = new mongoose.Schema(
    {
    name: { type: String, required: true },
    // make email unique 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
    },
    { collection: 'user-data' }// Can see at MongoDB , name of collection  
)



const model = mongoose.model('UserData', User); 
// const SaveHistory = mongoose.model('History', History);

module.exports = model; 
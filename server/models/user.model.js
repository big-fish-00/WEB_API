const mongoose = require('mongoose'); 

const User = new mongoose.Schema(
    {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    quote: { type: String },
    },
    { collection: 'user-data' }// Can see at MongoDB   
)



const model = mongoose.model('UserData', User); 
// const SaveHistory = mongoose.model('History', History);

module.exports = model; 
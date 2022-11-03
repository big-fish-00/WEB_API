const mongoose = require('mongoose');

const Weather = new mongoose.Schema(
    {
    email: { type: String },
    city: { type: String },
    },
    { collection: 'history-weather' }
)

const model2 = mongoose.model('CurrentWeather', Weather);

module.exports = model2; 

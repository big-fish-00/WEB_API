const express = require('express');
const app = express();
const axios = require('axios'); 
const mongoose = require('mongoose');

const {weather} = require('./models/weather');


const db = "mongodb+srv://dayu:19800429025856yh@cluster0.br8hvxy.mongodb.net/Mern?retryWrites=true&w=majority"; 

app.post('/home', (req, res) => {
    

})

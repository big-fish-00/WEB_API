const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/user.model');
const Weather = require('./models/weather');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

const app = express();

app.use(cors())
app.use(express.json())

//connect with Mongoose server
const db = "mongodb+srv://dayu:19800429025856yh@cluster0.br8hvxy.mongodb.net/Mern?retryWrites=true&w=majority"; 

mongoose.connect(db).then(()=>{ 
    console.log("Connected to database");})
    
    .catch(()=>{ 
        console.log("Error Connecting to database");}) 

app.post('/api/register', async(req,res) => {
    //pass the body to json
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash( req.body.password, 15)
        //control what go to database
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.json({json: 'ok'})
    }
    catch (err){
        res.json({json: 'error', error: "Someone already used this email"})

    }
})

app.post('/api/login', async(req,res) => {
    const user = await User.findOne({ 
        email: req.body.email,
        //password: req.body.password,
    })

    if(!user) { return { status: 'error', error: 'Invalid login' } }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    //create a special token and allow to determine whether user legit or not

    if (isPasswordValid) {
        //playload for sign
        const token = jwt.sign({
            name: user.name,
            email: user.email,

        }, 'secret123')
        return res.json({status: 'ok', user:token}
        )
    }
    else {
        return res.json({status: 'error', user:false})
    }
})

app.post('/api/home', async (req, res) => {
    console.log(req.body.city)
    try {
        await Weather.create({
          city: req.body.city,
          email: req.body.email
        })
        res.json({json: 'ok'})
        }
    catch (err){
        res.json({json: 'error', error: "The location didn't exist"})
        
    }
    
})

app.post('/api/search', async(req, res) => {
    const email = req.headers['x-access-email']
    Weather.find({'email': email}).exec((err, cities) => {
        if(err) return res.json({ status: 'error', error: 'Failed to get data'});
        return res.json({ status: 'ok', cities })
    })
    
})


app.post('/api/delete', async(req, res) => {
    console.log(req.body);
    try {
        const deleteWeather = await Weather.deleteOne({
            city: req.body.city,
            email: req.body.email
          })
          res.json({status:'ok'})
        }
    catch (err){
          res.json({json: 'error', error: "Fail to delete"})
          
      }
 })


app.get('/api/quote', async(req,res) => {
    const token = req.headers['x-access-token']

    try {

    const decode = jwt.verify(token, 'secret123')
    const email = decode.email
    const user = await User.findOne({email: email})

    return res.json ({status: 'ok', quote: user.quote})

    } catch (error) {
        console.log(error)
        res.json({status: 'error', error:'invalid token'})
    }
})

app.post('/api/quote', async(req,res) => {
    const token = req.headers['x-access-token']

    try {

    const decode = jwt.verify(token, 'secret123')
    const email = decode.email
    await User.updateOne(
        {email: email},
        { $set: {quote: req.body.quote}})

    return res.json({status: 'ok'})

    } catch (error) {
        console.log(error)
        res.json({status: 'error', error:'invalid token'})
    }
})

app.listen(5000, () => {
    console.log('listen on port 5000');
})

//i change something
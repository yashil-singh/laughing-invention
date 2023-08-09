require('dotenv').config()

//express app
const express = require('express');

const cors = require('cors')

const app = express();
const mongoose = require('mongoose')
const workoutRoutes = require('../routes/workouts')
const userRoutes = require('../routes/users')

//middlewares
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    next();
})

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI) //connect into your database by pasting your mongodb link here with your username and password
    .then(() => {
        //listening for request
        app.listen(process.env.PORT, () => {
            console.log('Connected to db and listening on port 4000');
        })
    })
    .catch((error) => {
        console.log(error)
    })

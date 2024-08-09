
require("dotenv").config();

const express = require("express")
const cors = require('cors')


//db connection
require('./db/connection')

const app= express()

const port = process.env.PORT || 3000

//middleware
app.use(express.json());
app.use(cors())


//require routes
const authRoutes = require('./routes/authRoutes')
const tasksRoutes = require('./routes/taskRoutes')

//routes 
app.use('/api', authRoutes )
app.use('/api/v1', tasksRoutes )

app.get("/", (req,res) => {
    res.send('hello')
})

app.listen(port, async () => {
    console.log(`server is running at port number ${port}`)
})
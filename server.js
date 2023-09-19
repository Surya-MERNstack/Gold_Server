const express = require("express");
const mongoose = require("mongoose");
const app = express();
const rotuer = require('./routes/routes')

require('dotenv').config()

const cors = require('cors');
app.use(cors());
app.use(express.json())
const db_url = process.env.DB_URL;
const port = process.env.PORT;
mongoose.connect(db_url, { useNewUrlParser: true });
app.use(express.urlencoded({ extended: false }));


const connect = mongoose.connection;

try{
    connect.on('open' , () => {
        console.log('mongoose is connected!!')
    })
}catch(err){
    console.log('Error',err)
}


app.use("/users",rotuer)


app.listen(port , () => {
    console.log(`server is running http://localhost:${port}`)
})

const express = require("express");
const mongoose = require("mongoose");
const app = express();

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

const goldRateSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  rate: { type: Number, required: true },
  carat: { type: String, required: true },
  weight: { type: Number, required: true },
  value: { type: Number, required: true },
});


// Create the gold rate model
const GoldRate = mongoose.model('GoldRate', goldRateSchema);

// API endpoint to add a new gold rate

app.post('/gold-rates', (req, res) => {
   rate = req.body.rate;
   carat = req.body.carat
   weight = req.body.weight;
   value = req.body.value;
  const date = new Date();

  const newGoldRate = new GoldRate({ date, rate ,carat , weight, value});

  newGoldRate.save()
    .then(() => {
      res.status(201).json({ message: 'Gold rate added successfully' });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error saving gold rate' ,error});
    });
});


// API endpoint to fetch all gold rates
app.get('/gold-rates', (req, res) => {
  GoldRate.find()
    .then((goldRates) => {
      res.status(200).json(goldRates);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error fetching gold rates' });
    });
});

app.listen(port , () => {
    console.log(`server is running http://localhost:${port}`)
})

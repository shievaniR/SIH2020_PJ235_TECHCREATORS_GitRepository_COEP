var express = require('express');
const bodyParser = require('body-parser');
const { Client, Query } = require('pg')
var cors = require('cors');

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();


//app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


client.connect();


app.get('/', (req, res) => res.send('BBox API Developed by Karpagam Institue of Technology for SIH 2020'))




app.listen(port, () => console.log(`API  listening at ${port}`))
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
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();


app.get('/', (req, res) => res.send('BBox API Developed by Karpagam Institue of Technology for SIH 2020'))


app.post('/data', function (req, res) {
    
    
    if (!req.body.west && !req.body.south && !req.body.east && !req.body.north)
    {
        res.send('Send BBOX xmin, ymin, xmax, ymax')
        return;
    }

    var tower_query = "SELECT json_build_object('type', 'FeatureCollection','crs',  json_build_object('type','name','properties', json_build_object('name','EPSG:4326')),'features', json_agg(json_build_object('type','Feature','geometry',ST_AsGeoJSON(geom)::json,'properties', json_build_object('radio', radio,'mcc',mcc,'net',net,'area',area,'cell', cell,'long', long,'lat',lat,'range',range)))) FROM towers WHERE geom && ST_SetSRID('BOX3D("+req.body.west+" "+req.body.south+","+req.body.east+" "+req.body.north+")'::box3d,4326)";
    var query = client.query(new Query(tower_query));
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
       // console.log(JSON.stringify(result.rows[0]))
        res.send(JSON.stringify(result.rows[0].json_build_object));       
        res.end();
    });
  });
  

app.listen(port, () => console.log(`API app listening at ${port}`))

On Sat, Aug 1, 2020 at 2:32 PM <madhusona@gmail.com> wrote:
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
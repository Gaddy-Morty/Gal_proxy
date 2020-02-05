const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = 3004;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));

// IMAGE GALLERY PROXY RESPONSE
app.get('/gallery/:id', (req, res) => {
  const id = req.params.id;

  axios.get(`http://localhost:3000/gallery/${id}`)
    .then(({ data }) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// REVIEW PROXY RESPONSE
app.get('/api/:id', (req, res) => {
  const id = req.params.id;

  axios.get(`http://localhost:3003/api/${id}`)
    .then(({ data }) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// CALENDAR PROXY RESPONSE
app.get('/month', (req, res) => {
  axios.get('http://localhost:3001/month', {
    params: req.query
  })
    .then(({ data }) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// RECS PROXY RESPONSE
app.get('/listings', (req, res) => {
  axios.get('http://localhost:3002/listings')
    .then(({ data }) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(PORT, () => console.log('Listening on port: ' + PORT));
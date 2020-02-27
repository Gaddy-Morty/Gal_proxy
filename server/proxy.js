const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const PORT = 4000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));

// CALENDAR PROXY RESPONSE

// ##################################################
// ##################################################
// ###############    L E G A C Y    ################
// ##################################################
// ##################################################
app.get('/month', (req, res) => {
  axios.get('http://52.53.187.170:3001/month', {
    params: req.query
  })
    .then(({ data }) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// get calendar css
app.get('/calendar/css', (req, res) => {
  axios.get(`http://52.53.187.170:3001/style.css`)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// get calendar bundle
app.get('/calendar', (req, res) => {
  axios.get(`http://52.53.187.170:3001/bundle.js`)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});


// RECS PROXY RESPONSE
app.get('/listings', (req, res) => {
  axios.get('http://13.52.217.109:3002/listings')
    .then(({ data }) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// recs bundle
app.get('/recs', (req, res) => {
  axios.get(`http://13.52.217.109:3002/bundle.js`)
    .then(({ data }) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});


// ##################################################
// ##################################################
// ###############    N E W A P I    ################
// ##################################################
// ##################################################

// CRUD for reservations
// Create, Read, Update, Delete

// Create
app.post('/v2/houses/:id/reservations/:check_in_date/:check_out_date/:adults/:children/:infants', (req, res) => {
  // console.log(req.url);
  // console.log(req);
  axios.post(`http://127.0.0.1:2000${req.url}`)
    .then(reservation => {
      res.send(reservation.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Read
app.get('/v2/house/:id/reservations', (req, res) => {
  axios.get(`http://127.0.0.1:2000${req.url}`)
    .then(reservations => {
      res.send(reservations.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Update
app.put('/v2/houses/:id/reservations/:reservationId/:check_in_date/:check_out_date/:adults/:children/:infants', (req, res) => {
  axios.put(`http://127.0.0.1:2000${req.url}`)
    .then(reservation => {
      res.send(reservation.data);
    })
    .catch((error) => {
      console.log(error);
    });
})

// Delete
app.delete('/v2/houses/:id/reservations/:reservationId', (req, res) => {
  axios.delete(`http://127.0.0.1:2000${req.url}`)
    .then(reservation => {
      res.send(reservation.data);
    })
    .catch((error) => {
      console.log(error);
    });
})

app.listen(PORT, () => console.log('Listening on port: ' + PORT));
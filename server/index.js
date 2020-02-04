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

app.listen(PORT, () => console.log('Listening on port: ' + PORT));
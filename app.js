
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


const homeRoutes = require('./routes/homeroutes');
app.use('/api/homes', homeRoutes);

app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});
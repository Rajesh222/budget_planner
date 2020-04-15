let express = require('express');
let bodyParser = require('body-parser');
const path = require('path');
var cors = require('cors');
const favicon = require('express-favicon');
let mongoose = require('mongoose');
let app = express();

let apiRoutes = require('./routes/api-routes');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);
const db = mongoose.connection;
if (!db) console.log('Error connecting db');
else console.log('Db connected successfully');
app.use('/api', apiRoutes);

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log('server is running on port 5000'));

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    api_v1 = require('./routes/api_v1'),
    puppies = require('./routes/puppies');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

app.get('/', function(req, res) {
  res.redirect('/puppies');
});

app.use('/api/v1', api_v1);
app.use('/puppies', puppies);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on port " + port);
});

module.exports = app;

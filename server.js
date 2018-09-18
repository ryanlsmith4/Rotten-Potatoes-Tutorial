

// set variables /configure express and handlebars
const express = require('express');
const methodOverride = require('method-override');
const app = express();
var exphbs = require('express-handlebars');
//Initialize mongoDB
const mongoose = require('mongoose');
//Initialize Body-Parser
const bodyParser = require('body-parser');

const Comment = require('./models/comment');
const Review = require('./models/review');


app.use(bodyParser.urlencoded({ extended: true }));

//override w/ post having ?_method=PUT
app.use(methodOverride('_method'));


//show
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rotten-potatoes', { useNewUrlParser: true });
require('./controllers/comments')(app);
require('./controllers/reviews')(app);
require('./controllers/movies')(app);

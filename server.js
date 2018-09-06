// set variables /configure express and handlebars
const express = require('express');
const methodOverride = require('method-override');
const app = express();
var exphbs = require('express-handlebars');
//Initialize mongoDB
const mongoose = require('mongoose');
//Initialize Body-Parser
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

//override w/ post having ?_method=PUT
app.use(methodOverride('_method'));

//show
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rotten-potatoes', { useNewUrlParser: true });

require('./controllers/reviews')(app);


//Communicate with localhost
// app.listen(3000 || process.env.PORT, () => {
//
//     console.log('App listening on port 3000!')
// });

module.exports = app;
// if(!module.parent){
//     app.listen(3000);
//}

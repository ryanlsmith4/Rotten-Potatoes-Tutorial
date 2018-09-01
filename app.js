// set variables /configure express and handlebars
const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
//Initialize mongoDB
const mongoose = require('mongoose');
//Initialize Body-Parser
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

//Method to handle review
const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String
});
//show
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.post('/reviews', (req, res) => {
    console.log(req.body);
    // res.render('reviews-new', {});
});

//Create function to save data to mongoDB
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
});

//Communicate with localhost
app.listen(3000, () => {
    console.log('App listening on port 3000!')
});

// Index
app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews });
        })
        .catch(err => {
            console.log(err);
        })
});

//Route for reviews/New
app.get('/reviews/new',(req, res) => {
    res.render('reviews-new', {});
});

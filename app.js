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

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    drop: Number
});

//override w/ post having ?_method=PUT
app.use(methodOverride('_method'));

app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
            res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
            console.log(err.message);
        })
})


//show
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');


//Create function to save data to mongoDB
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`); // Redirect to review._id
    }).catch((err) => {
        console.log(err.message);
    })
});

// Index
app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            console.log(reviews);
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

//This is Broken RN
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

//EDIT review
app.get('/reviews/:id/edit', function (req, res) {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', {review: review});
    })
})
//Communicate with localhost
app.listen(3000, () => {
    mongoose.connect('mongodb://localhost:27017/rotten-potatoes', { useNewUrlParser: true });
    console.log('App listening on port 3000!')
});

// set variables /configure express and handlebars
const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
//Initialize mongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rotten-potatoes', { useNewUrlParser: true });

const Review = mongoose.model('Review', {
    title: String
});
//show
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/', (req, res) => {
//     res.render('home', {msg: 'hello world!'});
// })

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
//Mock Array of Projects
// let reviews = [
//     { title: 'Great Review' },
//     { title: "Next Review" },
//     { title: "Check Out This one!" },
//     { title: "great movies dawg "}
// ];

// Index
app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews });
        })
        .catch(err => {
            console.log(err);
        })
})

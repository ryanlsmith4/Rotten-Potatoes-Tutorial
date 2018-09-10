// reviews.js
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

//export default function
 module.exports = function(app) {

    app.get('/', (req, res) => {
        Review.find()
            .then(reviews => {
                //console.log(reviews);
                res.render('reviews-index', { reviews: reviews });
            })
            .catch(err => {
                console.log(err);
            })
    });

    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/reviews/${review._id}`)
            })
            .catch(err => {
                console.log(err.message);
            })
    })
//Create function to save data to mongoDB
    app.post('/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            console.log(review);
            res.redirect(`/reviews/${review._id}`); // Redirect to review._id
        }).catch((err) => {
            console.log(err.message + " Here");
        })
    });

    //Route for reviews/New
    app.get('/reviews/new',(req, res) => {
        res.render('reviews-new', {});
    });

    //Gets Review at ID
    // app.get('/reviews/:id', (req, res) => {
    //   Review.findById(req.params.id).then((review) => {
    //     res.render('reviews-show', { review: review })
    //   }).catch((err) => {
    //     console.log(err.message);
    //   })
    // })

    //EDIT review
    app.get('/reviews/:id/edit', function (req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {review: review});
        })
    })

    // Delete
    app.delete('/reviews/:id', function (req, res) {
        console.log("DELETE review");
        Review.findOneAndDelete(req.params.id).then((review) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })
// get reviews and comments because they are associated
    app.get('/reviews/:id', (req, res) => {
        // find review
        Review.findById(req.params.id).then(review => {
            // fetch it's comments
            Comment.find({ reviewId: req.params.id }).then(comments => {
                // respond with the template with both values
                res.render('reviews-show', { review: review, comments: comments })
            })
        }).catch((err) => {
            // catch errors
            console.log(err.message);
        });
    });

    //Delete comments
    app.delete('/reviews/comments/:id', function (req, res) {
        console.log("DELETE comment");
        Comment.findOneAndDelete(req.params.id).then((comment) => {
            res.redirect(`/reviews/${comment.reviewId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

    app.listen(process.env.PORT || 3000, () => {

        console.log('App listening on port 3000!')
    });

}

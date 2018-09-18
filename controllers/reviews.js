// reviews.js
const Review = require('../models/review.js');
const Comment = require('../models/comment.js');

//export default function
module.exports = function(app) {

    // route to movies.js
    //      app.get('/', (req, res) => {
    //   res.render('movies-index');
    // })

        // app.get('/', (req, res) => {
        //     Review.find()
        //         .then(reviews => {
        //             //console.log(reviews);
        //             res.render('reviews-index', { reviews: reviews });
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        // });



    app.post('/movies/:movieId/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            console.log(review);
            res.redirect(`/movies/${review.movieId}`);
        }).catch((err) => {
            console.log(err.message)
        })
    })

    // assign review to movies:id
    app.get('/movies/:movieId/reviews/new', (req, res) => {
        console.log(req.params.movieId);
        res.render('reviews-new', {
            movieId: req.params.movieId
        });
    })

    app.get('/movies/:movieId/reviews/:id', (req, res) => {
        // find review
        Review.findById(req.params.id).then(review => {
            // fetch its comments
            Comment.find({
                reviewId: req.params.id
            }).then(comments => {
                // respond with the template with both values
                res.render('reviews-show', {
                    review: review,
                    comments: comments
                })
            })
        }).catch((err) => {
            // catch errors
            console.log(err.message)
        });
    });

    app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
        Review.findById(req.params.id).then((review) => {
            res.render('reviews-edit', {
                review: review
            })
        }).catch((err) => {
            console.log(err.message);
        })
    })


    //Gets Review at ID
// app.get('/reviews/:id', (req, res) => {
//   Review.findById(req.params.id).then((review) => {
//     res.render('reviews-show', { review: review })
//   }).catch((err) => {
//     console.log(err.message);
//   })
// })


    app.put('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/movies/${review.movieId}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })
//DELETE COMMENTS
    app.delete('/movies/:movieId/reviews/:id', function(req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect(`/movies/${review.movieId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })



    app.listen(process.env.PORT || 3000, () => {

        console.log('App listening on port 3000!')
    });

}

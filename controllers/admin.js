// admin.js
const Review = require('../models/review.js')

module.exports = function(app) {
// NEW Comment
app.get('/admin', (req, res) => {
  Review.find()
    .then(reviews => {
        res.render('admin', { reviews: reviews });
    })
    .catch(error => {
      console.log(error);
    });
});

app.delete('/admin/reviews/:id', (req, res) => {
    console.log("DELETE review");
    Review.findByIdAndRemove(req.params.id).then((review)=>{
        res.status(200).send(review);
    }).catch((err) => {
        console.log(err.message);
    })
});

}

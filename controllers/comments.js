//comments.js
const Comment = require('../models/comment.js');
const Review = require('../models/review.js');
//Create Comment
module.exports = function(app) {

    
    app.post('/reviews/comments', (req, res) => {
   //    console.log(req);
       Comment.create(req.body).then(comment => {
         console.log(comment);
         res.status(200).send({ comment: comment });
       }).catch((err) => {
         res.status(400).send({ err: err })
       })
     })

     app.delete('/reviews/comments/:id', function (req, res) {
       console.log("DELETE comment")
       Comment.findByIdAndRemove(req.params.id).then((comment) => {
         res.status(200).send(comment);
       }).catch((err) => {
         console.log(err.message);
       })
     })

   }

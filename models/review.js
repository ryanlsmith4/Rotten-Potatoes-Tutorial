const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
    title: String,
    description: String,
    movieTitle: String,
    drop: Number
});

module.exports = Review;

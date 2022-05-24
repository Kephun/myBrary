const mongoose = require('mongoose');
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next) {
    Book.find({author:this.id}, (err, books) => {
        if (err) {
            next(err)
        } else if (books.length > 0) {
            next(new Error('This Author has books linked to hi/her'))
        } else {
            next()
        }
    })
}) // function runs before the remove takes place 

module.exports = mongoose.model('Author', authorSchema)
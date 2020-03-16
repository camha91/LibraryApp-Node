const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }, 
    authors: {
        type: String,
		required: true,
		trim: true
    },
	categories: {
		type: String,
		required: true,
		trim: true
	},
	pageCount: {
		type: Number,
		required: true
	},
	imageLink: {
		type: String,
		required: "imageLink can't be empty",
		trim: true,
		validate(value) {
			if (!validator.isURL(value)) {
				throw new Error('Link is invalid!');
			};
		}
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // }
}, {
    timestamps: true
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
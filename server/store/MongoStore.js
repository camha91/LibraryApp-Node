const mongooseConnect = require('../db/mongoose');
const mongoose = require('mongoose');
const Book = require('../models/book');
const logging = require('../../commonUtils/loggingUtils');
const logger = logging.getLogger('MongoStore');

class MongoStore {
	constructor() {
		mongooseConnect();
	}
	
	async saveBook(bookDict) {
		const newBook = new Book(bookDict);
		try {
			await newBook.save();
			logger.info(`new book ${bookDict.title} saved to DB`);
		} catch(e) {
			logger.info('save new book to DB failed: ');
			logger.debug(e);
			logger.debug(bookDict);
		};
		
	};
	
	async readAllBooks() {
		try {
			const books = await Book.find({});
			return books;
		} catch (e) {
			logger.info('no book in DB');
			logger.debug(e);
		};
	};
}; 

module.exports = MongoStore;
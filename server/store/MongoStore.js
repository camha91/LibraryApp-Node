const mongooseConnect = require('../db/mongoose');
const mongoose = require('mongoose');
const Book = require('../models/book');
const logging = require('../../commonUtils/loggingUtils');
const logger = logging.getLogger('MongoStore');

class MongoStore {
	constructor() {
		mongooseConnect();
		this.updateOptions = { new: true, runvalidators: true };
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
	
	async getBookById(id) {
		try {
			const myBook = await Book.findById(id);
			if (!myBook) {
				throw new Error(`no book with ${id} in the system`);
				}
			return myBook;
		} catch (e) {
			logger.info('no book with such ID');
			logger.debug(e);
		}
	};
	
	async updateTitle(id, title) {
		try {
			const update = { title: title };
			const book = await Book.findByIdAndUpdate(id, update, this.updateOptions);
			logger.info(`Updated Book: ${book}`);
		} catch(e) {
			logger.info(`Failed to update book with id ${id}`);
			logger.debug(e);
		};
	};
	
	async updateAuthor(id, authors) {
		try {
			const update = { authors: authors };
			const book = await Book.findByIdAndUpdate(id, update, this.updateOptions);
			logger.info(`Updated Book: ${book}`);
		} catch(e) {
			logger.info(`Failed to update book with id ${id}`);
			logger.debug(e);
		};
	};
	
	async updateDescription(id, description) {
		try {
			const update = { description: description };
			const book = await Book.findByIdAndUpdate(id, update, this.updateOptions);
			logger.info(`Updated Book: ${book}`);
		} catch(e) {
			logger.info(`FAiled to update book with id ${id}`);
			logger.debug(e);
		};
	};
	
	async updateBook(id, partialBookDict) {
		try {
			const update = partialBookDict;
			const book = await Book.findByIdAndUpdate(id, update, this.updateOptions);
			logger.info(`Updated Book: ${book}`);
		} catch(e) {
			logger.info(`FAiled to update book with id ${id}`);
			logger.debug(e);
		};
	};
	
	async deleteBook(id) {
		try {
			const book = await Book.findByIdAndDelete(id);
			if (!book) {
				throw new Error(`The book with ${id} does not exist in the system`);
			};
			logger.info(`Deleted book: ${book}`);
		} catch (e) {
			logger.info('Failed to delete book');
			logger.debug(e);
		};
	};
	
}; 

module.exports = MongoStore;
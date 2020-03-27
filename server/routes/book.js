const MongoStore = require('../store/MongoStore');
const mongoStore = new MongoStore();
const bookSearch = require('../utils/bookSearchGoogle');
const express = require('express');
const router = new express.Router();
const logging = require('../../commonUtils/loggingUtils');
const logger = logging.getLogger(__filename);

// Add book to DB
router.post('/books', async (req, res) => {
    logger.info('<----- Book Router');
    try {
        const book = await mongoStore.saveBook(req.body);
        res.status(201).send(book);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Get all books from DB
router.get('/books', async (req, res) => {
	try {
		const books = await mongoStore.readAllBooks();

		if (!books) {
			return res.status(404).send()
		}
		res.send(books);
	} catch (e) {
		res.status(500).send(e);
	}
});

// Update Book by ID
router.patch('/books/:id', async (req, res) => {
	try {
		const book = await mongoStore.updateBook(req.params.id, req.body);

		if (!book) {
			return res.status(404).send();
		}

		res.send(book);
	} catch (e) {
		res.status(400).send(e);
	}
});

// Delete book by ID
router.delete('/books/:id', async (req, res) => {
	try {
		const book = await mongoStore.deleteBook(req.params.id);

		if (!book) {
			return res.status(404).send();
		}

		res.send(book);
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
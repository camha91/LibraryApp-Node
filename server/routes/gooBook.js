const bookSearch = require('../utils/bookSearchGoogle');
const express = require('express');
const router = new express.Router();
const logging = require('../../commonUtils/loggingUtils');
const logger = logging.getLogger(__filename);

router.get('/goobooks', (req, res) => {
	logger.debug('<----- GooBook Router');
	if (!req.query.searchType || !req.query.searchValue) {
		return res.send({
			error: "Please provide search Type and search Value!"
		});
	};

	bookSearch(req.query.searchType, req.query.searchValue, (error, bookData) => {
		if (error) {
			return res.send({ error });
		};
		logger.debug(`bookData : ${JSON.stringify(bookData)}`);
		// Create a bookData dict to store data
		try {
			res.send({ 
			id: bookData.id,
			title: `${bookData.volumeInfo.title}: ${bookData.volumeInfo.subtitle}`,
			authors: bookData.volumeInfo.authors.join(' , '),
			categories: bookData.volumeInfo.categories.join(' , '),
			pageCount: bookData.volumeInfo.pageCount,
			imageLink: `https://books.google.com/books/content?id=${bookData.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`,
			description: bookData.volumeInfo.description,
		});
		} catch(e) {
			logger.info('Something wrong with bookData dick callback. Note: categories missing. Catch error to avoid app crash!!');
			logger.debug(e);
		};
	});
});

module.exports = router;
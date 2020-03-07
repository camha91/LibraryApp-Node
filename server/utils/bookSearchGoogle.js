const request = require('request');

const bookSearch = (searchType, searchValue, callback) => {
	let url = '';
	
	if (searchType === 'isbn') {
		url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchValue}&orderedBy=newest`;
	} else if (searchType === 'title') {
		url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(searchValue)}&limit=5`;  
	} else if (searchType === 'author') {
		url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(searchValue)}&limit=5`;   
	} else {
		url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchValue)}&limit=5`; 
	}
	
	console.log(url);
	
			
	request({ url, json: true}, (error, { body }) => {
		if (error) {
			callback('Unable to connect to book search service', undefined);
		} else if (body.items.length === 0) {
			callback('Unable to find book! Try another search', undefined);
		} else {
			callback(undefined, {
				title: body.items[0].volumeInfo.title,
				author: body.items[0].volumeInfo.authors[0],
				pages: body.items[0].volumeInfo.pageCount,
				rating: body.items[0].volumeInfo.averageRating,
				thumbnail: body.items[0].volumeInfo.imageLinks.thumbnail
			});
		};
	});
};

	module.exports = bookSearch;
// bookSearch('all', '9780605039070', (error, data) => {
// 	console.log('Error', error);
// 	console.log('Data', data);
// })
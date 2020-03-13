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
		} else if (body.error) {
			callback('Unable to connect to book search service', body);
		} else if (body.totalItems === 0) {
			callback('Unable to find book! Try another search', undefined);
		} else {
			callback(undefined, body.items[0]);
		};
	});
};

	module.exports = bookSearch;

const request = require('request')

const bookSearch = (searchType, searchValue, callback) => {
	let url = ''
	
	if (searchType === 'isbn') {
		url = `https://openlibrary.org/api/books?bibkeys=ISBN:${searchValue}&jscmd=data&format=json`
	} else if (searchType === 'title') {
		url = `http://openlibrary.org/search.json?title=${searchValue}&limit=5`  
	} else if (searchType === 'author') {
		url = `http://openlibrary.org/search.json?author=${searchValue}&limit=5`   
	} else {
		url = `http://openlibrary.org/search.json?q=${searchValue}&limit=5` 
	}
	
	console.log(url)
	
    request({ url, json: true },  (error, { body }) => {
        if (error) {
			console.log(error)
		}
			
		console.log(body)
		console.info(`Title: ${body.docs[0].title_suggest}`)
		console.info(`Author: ${body.docs[0].author_name[0]}`)
		// console.info(`Pages: ${body.items[0].volumeInfo.pageCount}`)
		// console.info(`Rating: ${body.items[0].volumeInfo.averageRating}`)
		// console.info(`Thumbnail: ${body.items[0].volumeInfo.imageLinks.thumbnail}`)
		})
}

bookSearch('all', 'j.k.rowling')
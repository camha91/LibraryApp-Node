const request = require('request')

const bookSearch = (searchType, searchValue, callback) => {
	let url = ''
	
	if (searchType === 'isbn') {
		url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchValue}&orderedBy=newest`
	} else if (searchType === 'title') {
		url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}&limit=5`  
	} else if (searchType === 'author') {
		url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchValue}&limit=5`   
	} else {
		url = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&limit=5` 
	}
	
	console.log(url)
	
    request({ url, json: true },  (error, { body }) => {
        if (error) {
			console.log(error)
		}
			
		console.log(body)
		console.info(`Title: ${body.items[0].volumeInfo.title}`)
		console.info(`Author: ${body.items[0].volumeInfo.authors[0]}`)
		console.info(`Pages: ${body.items[0].volumeInfo.pageCount}`)
		console.info(`Rating: ${body.items[0].volumeInfo.averageRating}`)
		console.info(`Thumbnail: ${body.items[0].volumeInfo.imageLinks.thumbnail}`)
		})
}

bookSearch('all', '9780605039070')
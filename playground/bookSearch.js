const request = require('request')

const bookSearch = (searchType, searchValue, callback) => {
	let url = ''
	
	if (searchType === 'isbn') {
		url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${searchValue}&orderedBy=newest`
	} else if (searchType === 'title') {
			url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchValue}&limit=5`  
		} else if (searchType === 'author') {
				url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${searchValue}&limit=5`   
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

				// callback('Unable to connect to books service', undefined)
				// } else if (body.items.length === 0) {
				// callback('Unable to find the book ISBN! Try another search', undefined)
				// } else {
				// callback(undefined, {
				// title: body.items.volumeInfo.title,
				// author: body.items.volumeInfo.authors[0],
				// pages: body.items.volumeInfo.pageCount,
				// thumbnail: body.items.volumeInfo.imageLinks.thumbnail
				// })
				// }
				// })
		
		})
}

bookSearch('isbn', '9780605039070')
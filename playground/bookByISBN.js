const request = require('request')

const bookSearchByISBN = (isbn, callback) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&orderBy=newest`
	
	console.log(url)
	
    request({ url, json: true },  (error, { body }) => {
        if (error) {
			console.log(error)
		}
			
		console.log(body)
		console.info(`Title: ${body.items[0].volumeInfo.title}`)
		console.info(`Author: ${body.items[0].volumeInfo.authors[0]}`)

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

bookSearchByISBN('9780605039070')
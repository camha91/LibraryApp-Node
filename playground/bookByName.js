const request = require('request')

const bookSearchByName = (bookName, callback) => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&limit=5`
	
	console.log(url)
	
    request({ url, json: true },  (error, { body }) => {
        if (error) {
			console.log(error)
		}
			
		console.log(body)
		console.info(`Title: ${body.items[0].volumeInfo.title}`)
		console.info(`Author: ${body.items[0].volumeInfo.authors[0]}`)
		})
}

bookSearchByName('harry')
const fetch = require("node-fetch");

async function getBooks() {
	const url = 'https://libraryappnode1-zpicx.run-us-west2.goorm.io/books';
	const response = await fetch(url);
	return await response.json();
}

getBooks().then(data => console.log(data));
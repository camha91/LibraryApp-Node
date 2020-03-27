const fetch = require("node-fetch");

async function addBook(bookDict) {
	const url = 'http://localhost:3000/books';
	const requestConfig = {
		method: 'POST', // *GET, POST, PUT/PATCH, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(bookDict) // body data type must match "Content-Type" header
	};
	const response = await fetch(url, requestConfig);
	return await response.json();
}
//
// addBook({
// 	title: 'Introduction To Algorithms',
//     authors: 'Thomas H.. Cormen, Charles E Leiserson, Ronald L Rivest, Clifford Stein',
//     categories: 'Computers',
//     pageCount: 1180,
//     imageLink: 'https://books.google.com/books/content?id=NLngYyWFl_YC&printsec=frontcover&img=1&zoom=10&edge=curl&source=gbs_api',
//     description: 'An extensively revised edition of a mathematically rigorous yet accessible introduction to algorithms.',
// }).then(data => console.log((data)));

async function getBooks() {
	const url = 'http://localhost:3000/books';
	const response = await fetch(url);
	return await response.json();
}

//getBooks().then(data => console.log(data));

async function updateBook(id, bookDict) {
	const url = `http://localhost:3000/books/${id}`;
	const requestConfig = {
		method: 'PATCH', // *GET, POST, PUT/PATCH, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
		body: JSON.stringify(bookDict) // body data type must match "Content-Type" header
	};
	const response = await fetch(url, requestConfig);
	return await response.json();
}

// updateBook('5e7c4ea997766602b926b5e5', {
// 	title: 'Introduction To JFAKJDFKJAK',
//     authors: 'CAMHA NGUYEN',
//     categories: 'Computers',
//     pageCount: 1180,
//     imageLink: 'https://books.google.com/books/content?id=NLngYyWFl_YC&printsec=frontcover&img=1&zoom=10&edge=curl&source=gbs_api',
//     description: 'An extensively revised edition of a mathematically rigorous yet accessible introduction to algorithms.',
// }).then(data => console.log((data)));

async function deleteBook(id) {
	const url = `http://localhost:3000/books/${id}`;
	const requestConfig = {
		method: 'DELETE', // *GET, POST, PUT/PATCH, DELETE, etc.
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *client
	};
	const response = await fetch(url, requestConfig);
	return await response.json();
}

deleteBook('5e7c4e04e3c3b702a186ba03').then(data => console.log(data));


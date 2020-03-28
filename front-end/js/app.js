const isbnElement = document.querySelector('#isbn');
const searchBtn = document.querySelector('.search-btn');
const progressBar = document.querySelector('.progress');
const bookContent = document.querySelector('.book-content');
const bookTitle = document.querySelector('.book-title');
const authors = document.querySelector('.authors');
const categories = document.querySelector('.categories');
const pageCount = document.querySelector('.pageCount');
const bookImage = document.querySelector('.book-image');
const bookSummary = document.querySelector('.book-summary');
const borrowBtn = document.querySelector('.borrow-btn');
const cancelBtn = document.querySelector('.cancel-btn');
const totalBook = document.querySelector('.total-books');
const itemList = document.querySelector('#item-list');

let allbooks = {};
let currentBook = {};
let currentBookIndex = '';

/*
* Render all books to Item List UI
 */
(renderItemListToUI)();

// Get all books from DB
async function getBooks() {
	const url = '/books';
	const response = await fetch(url);
	return await response.json();
}

// Render all books that get from DB to show to UI
async function renderItemListToUI() {
	itemList.innerHTML = '';
	allbooks = await getBooks();
	console.log(allbooks);
	console.log(`Total Books: ${allbooks.length}`);
	totalBook.textContent = allbooks.length;
	allbooks.forEach(book => {
		const shortDescription = book.description.replace(/(.{500})..+/, "$1&hellip;");
		const bookImageThumbnail = book.imageLink.replace('zoom=10', 'zoom=1');
		itemList.innerHTML += `
			<li class="collection-item" id="${book._id}">
				<div class="row">
					<div class="col s1"> </div>
						<div class="col s2">
							<a><img src="${bookImageThumbnail}" alt="image"></a>
						</div>
						<div class="col s8">
							<strong>Book: </strong> <em>${book.title}</em>
							<br>
							<strong>Author: </strong> <em>${book.authors}</em>
							<br>
							<strong>Pages: </strong> <em>${book.pageCount}</em>
							<br>
							<strong>Description: </strong> <em>${shortDescription}</em>
							<a href="#" class="secondary-content">
								<i class="edit-item fa fa-pencil"></i>
							</a>
						</div>
				</div>
			</li>
			`
	});
}

// Search event for book
searchBtn.addEventListener('click', e => {
	e.preventDefault();

	if (isbnElement.value === '') {
		showAlert('ISBN is empty. Please enter ISBN number!', 'error');
	} else {
		const bookRouteUrl = `/goobooks?searchType=isbn&searchValue=${isbnElement.value}`;
		console.log(bookRouteUrl);
		fetch(bookRouteUrl).then((response) => {
			response.json().then((bookData) => {
				currentBook = bookData;
				console.log(currentBook);
				updateBookContentUI(currentBook);
			})
		})
	}
	isbnElement.value = '';
});


const updateBookContentUI = (bookData) => {
	if (bookData.error) {
		if (!progressBar.classList.contains("hide")) {
			progressBar.classList.add("hide");
		}
		if (!bookContent.classList.contains("hide")) {
			bookContent.classList.add("hide");
			}
		clearAndHideBookContent();
		showAlert(bookData.error, 'error');
	} else {
		bookTitle.innerText = bookData.title;
		authors.innerText = bookData.authors;
		categories.innerText = bookData.categories;
		pageCount.innerText = bookData.pageCount;
		bookSummary.innerHTML = `<strong><i> ${bookData.description} </i> </strong>`;
		bookImage.src = bookData.imageLink;
		console.log(bookData);
		progressBar.classList.remove("hide");
		setTimeout(() => {
			progressBar.classList.add("hide");
			bookContent.classList.remove("hide");
		}, 1000);
	}
};

/*
* Handle click Event of Borrow Button
* Push Card panel book data to DB through API /books POST method
* Re-render data to UI
 */

cancelBtn.addEventListener('click', (e) => {
	e.preventDefault();
	bookContent.classList.add("hide");
});

borrowBtn.addEventListener('click', (e) => {
	e.preventDefault();
	clearAndHideBookContent();
	bookContent.classList.add("hide");
	console.log("Clicking borrow");
	console.log(currentBook);
	addBook(currentBook).then(data => {
		console.log(data);
		showAlert('Book Added!', 'success');
		(renderItemListToUI)();
	})
});

const clearAndHideBookContent = () => {
	bookTitle.innerText = '';
	authors.innerHTML = '';
	categories.innerText = '';
	pageCount.innerText = '';
	bookSummary.innerHTML = '';
	bookImage.src = '';
};

async function addBook(bookDict) {
	const url = '/books';
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

/*
* Handle click Event of edit-item button
* Update the current working book index
* Render the current working book to Update Form
 */


// UI Selector for Update Form
const bookUpdate = document.querySelector('.book-update');
const updateTitle = document.querySelector('#update-title');
const updateAuthor = document.querySelector('#update-author');
const updatePageCount = document.querySelector('#update-page-count');
const updateDescription = document.querySelector('#update-description');

itemList.addEventListener('click', (e) => {
	e.preventDefault();
	console.log(e);
	if (e.target.classList.contains("edit-item")) {
		currentBookIndex = e.target.parentNode.parentNode.parentNode.parentNode.id;
		allbooks.forEach(book => {
			if (book._id === currentBookIndex) {
				currentBook = book;
				console.log('Clicking update book!');
				console.log(book);
				renderBookToForm(book);
			}
		});
		bookUpdate.classList.remove("hide");
	}
});

function renderBookToForm(bookDict) {
	updateTitle.value = bookDict.title;
	updateAuthor.value = bookDict.authors;
	updatePageCount.value = bookDict.pageCount;
	updateDescription.value = bookDict.description;
}

/*
* Handle click Event of Update button
* Update the modifying data of current book through API /books/:id PATCH method
* Re-render all books to ItemList UI
 */

const updateBtn = document.querySelector('.update-btn');
updateBtn.addEventListener('click', e => {
	e.preventDefault();
	const updateBookDict = {};
	updateBookDict.title = updateTitle.value;
	updateBookDict.authors = updateAuthor.value;
	updateBookDict.pageCount = updatePageCount.value;
	updateBookDict.description = updateDescription.value;
	updateBook(currentBook._id, updateBookDict).then(data => {
		showAlert('Updated Book!', 'success');
		console.log(data);
		(renderItemListToUI)();
	});
	bookUpdate.classList.add("hide");
});

async function updateBook(id, bookDict) {
	const url = `/books/${id}`;
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

/*
* Handle click Event of Delete button
* Update the modifying data of current book through API /books/:id DELETE method
* Re-render all books to ItemList UI
 */

const deleteBtn = document.querySelector('.delete-btn');
deleteBtn.addEventListener('click', e => {
	e.preventDefault();
	deleteBook(currentBook._id).then(data => {
		showAlert('Deleted Book!', 'success');
		console.log(data);
		(renderItemListToUI)();
	})
	bookUpdate.classList.add("hide");
});

async function deleteBook(id) {
	const url = `/books/${id}`;
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


function showAlert(message, className) {
	// Create div
	const div = document.createElement('div');
	// Add classes
	div.className = `alert ${className}`;
	if (className === 'success') {
		div.style = 'color:green';
	} else {
		div.style = 'color:red';
	}
	// Add text
	div.appendChild(document.createTextNode(message));
	// Get parent
	const container = isbnElement.parentElement;
	// Insert alert
	container.insertBefore(div, isbnElement.nextSibling);

	// Timeout after 3 sec
	setTimeout(function(){
		document.querySelector('.alert').remove();
	}, 3000);
}